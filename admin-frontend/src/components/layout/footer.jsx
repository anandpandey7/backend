const Footer = () => {
  return (
    <footer className="app-footer">
      {/* Right side */}
      <div className="float-end d-none d-sm-inline">
        Anything you want
      </div>

      {/* Copyright */}
      <strong>
        Copyright &copy; 2014–2026&nbsp;
        <a
          href="https://adminlte.io"
          className="text-decoration-none"
          target="_blank"
          rel="noopener noreferrer"
        >
          AdminLTE.io
        </a>.
      </strong>
      All rights reserved.
    </footer>
  );
};

export default Footer;
