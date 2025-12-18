const SmallCard = ({
  value,
  label,
  color = "primary",
  footerTheme = "light",
  icon,
}) => {
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box text-bg-${color}`}>
        <div className="inner">
          <h3>{value}</h3>
          <p>{label}</p>
        </div>

        {icon && (
          <div className="small-box-icon">
            {icon}
          </div>
        )}

        <a
          href="#"
          className={`small-box-footer link-${footerTheme} link-underline-opacity-0 link-underline-opacity-50-hover`}
        >
          More info <i className="bi bi-link-45deg"></i>
        </a>
      </div>
    </div>
  );
};

export default SmallCard;
