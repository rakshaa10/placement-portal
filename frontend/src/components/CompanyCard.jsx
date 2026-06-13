import { Link } from "react-router-dom";
function CompanyCard({ company }) {
  return (
    <Link to={`/company/${company.id}`}>
      <div>
        <h3>{company.name}</h3>
        <p>{company.role}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;