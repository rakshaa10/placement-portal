import CompanyCard from "../components/CompanyCard";
import { useEffect, useState } from "react";
import api from "../services/api";

function HomePage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Placepedia</h1>

      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}

export default HomePage;
