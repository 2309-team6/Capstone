import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <footer>
      <Link to="/admin/album" className="footer-link">
        Add Album
      </Link>
    </footer>
  );
}

export default AdminFooter;
