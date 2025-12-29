import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API_BASE_URL } from "../helper/config";

const API = `${API_BASE_URL}/api/products`;
const SETTINGS_API = `${API_BASE_URL}/api/settings`; // 🔹 New API for categories

/* ================= CKEditor Upload Adapter ================= */

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const data = new FormData();
    data.append("upload", file);

    const res = await fetch(`${API_BASE_URL}/api/ckeditor/upload`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const result = await res.json();

    if (!result.url) {
      throw new Error("No URL returned from server");
    }

    // ✅ If backend already sends full URL, don’t double it
    const imageUrl = result.url.startsWith("http")
      ? result.url
      : `${API_BASE_URL}${result.url}`;

    return {
      default: imageUrl,
    };
  }

  abort() {}
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

/* ================= Helpers ================= */

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
};

/* ================= ProductCard ================= */

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const truncateText = (text, maxLength = 90) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const fixImageUrls = (html) => {
    if (!html) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("/")) {
        img.setAttribute("src", "http://localhost:5000" + src);
      }
    });

    return doc.body.innerHTML;
  };

  return (
    <>
      <div className="product-card card shadow-sm">
        <img
          src={`http://localhost:5000${product.image}`}
          className="card-img-top"
          alt={product.productName}
          style={{
            height: "160px",
            width: "100%",
            objectFit: "contain",
          }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {product.productName}
          </h5>
          
          {/* 🔹 Show Category Badge */}
          {product.productCategory && (
             <span className="badge bg-light text-dark border mb-2 align-self-start">
               {product.productCategory}
             </span>
          )}

          <p className="card-text text-muted mb-1">
            {truncateText(product.description)}
          </p>

          <p className="text-success fw-bold mb-2">₹{product.price}</p>

          {product.longDescription && (
            <button
              className="btn btn-link btn-sm p-0 mb-2"
              onClick={() => setShowModal(true)}
            >
              View Full Description →
            </button>
          )}

          <div className="d-flex justify-content-between mt-auto">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {product.productName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="text-center mb-3">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.productName}
                    className="img-fluid rounded shadow-sm"
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      maxHeight: "180px",
                      objectFit: "cover"
                    }}
                  />
                </div>

                <h6 className="fw-semibold mb-1">Description</h6>
                <p
                  className="text-muted small mb-3"
                  style={{ lineHeight: "1.4" }}
                >
                  {product.description}
                </p>

                <h6 className="fw-semibold mb-1">Price</h6>
                <p className="text-success fw-bold mb-3">₹{product.price}</p>

                <hr className="my-2" />

                <h6 className="fw-semibold mb-2">Full Description</h6>

                <div
                  className="product-description-content small"
                  style={{
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    lineHeight: "1.5"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: fixImageUrls(product.longDescription || "")
                  }}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    onEdit(product);
                  }}
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .product-description-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }
      `}</style>
    </>
  );
};

/* ================= CreateProduct ================= */

const CreateProduct = ({ editProduct, onProductSaved, onCancelEdit, categories }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [productCategory, setProductCategory] = useState(""); // 🔹 State for category
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (editProduct) {
      setProductName(editProduct.productName);
      setDescription(editProduct.description);
      setLongDescription(editProduct.longDescription || "");
      setProductCategory(editProduct.productCategory || ""); // 🔹 Set existing category
      setPrice(editProduct.price);
      setImage(null);
    } else {
      setProductName("");
      setDescription("");
      setLongDescription("");
      setProductCategory("");
      setPrice("");
      setImage(null);
    }
  }, [editProduct]);

  const handleSubmit = async () => {
    if (!editProduct && !image) {
      toast.error("Please upload an image");
      return;
    }

    if (!productName || !description || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("longDescription", longDescription);
    formData.append("productCategory", productCategory); // 🔹 Add category to formData
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const url = editProduct ? `${API}/${editProduct._id}` : API;
      const method = editProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save product");
        return;
      }

      toast.success(`Product ${editProduct ? "updated" : "added"} successfully!`);
      
      // Clear form
      setProductName("");
      setDescription("");
      setLongDescription("");
      setProductCategory("");
      setPrice("");
      setImage(null);

      onProductSaved(data.product);

    } catch (err) {
      console.error(err);
      toast.error("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProductName("");
    setDescription("");
    setLongDescription("");
    setProductCategory("");
    setPrice("");
    setImage(null);
    onCancelEdit();
    toast.info("Edit cancelled");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">
          {editProduct ? "Edit Product" : "Add Product"}
        </h3>
        {editProduct && (
          <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* 🔹 Category Dropdown */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select 
            className="form-select" 
            value={productCategory} 
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <textarea
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={longDescription}
            config={{
              licenseKey: "GPL",
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setLongDescription(data);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            {editProduct ? "Replace Image (optional)" : "Product Image"}
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editProduct}
          />
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary w-100"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
};

/* ================= ProductAdmin ================= */

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // 🔹 Categories state
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  // 🔹 Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // 🔹 Fetch categories from settings
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(SETTINGS_API);
      const data = await res.json();
      if (data.success && data.setting) {
        setCategories(data.setting.productCategory || []);
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchProducts = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
      if (editProduct?._id === id) setEditProduct(null);
    } else {
      toast.error("Delete failed");
    }
  };

  const handleProductSaved = (product) => {
    if (editProduct) {
      setProducts((prev) => prev.map((p) => (p._id === product._id ? product : p)));
      setEditProduct(null);
    } else {
      fetchProducts();
    }
  };

  // 🔹 Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || product.productCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <CreateProduct
            editProduct={editProduct}
            onProductSaved={handleProductSaved}
            onCancelEdit={() => setEditProduct(null)}
            categories={categories} // 🔹 Pass categories to form
          />
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h4 className="mb-3">Inventory Management</h4>
              
              {/* 🔹 Search and Filter Bar */}
              <div className="row g-2">
                <div className="col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <select
                    className="form-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="card-body bg-light">
              {loading ? (
                <p>Loading...</p>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                   <p className="text-muted">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className="products-scroll-container pb-2">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onEdit={setEditProduct}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .products-scroll-container {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .product-card {
          min-width: 280px;
          max-width: 280px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ProductAdmin;