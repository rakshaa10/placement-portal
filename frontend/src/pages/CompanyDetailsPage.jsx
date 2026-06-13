import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function CompanyDetailsPage() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/${id}/full`);
        setCompany(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.role}</p>
    </div>
  );
}

export default CompanyDetailsPage;
