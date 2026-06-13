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

      <h2>Experiences</h2>

      {company.experiences.map((experience) => (
        <div key={experience.id}>
          <h3>{experience.title}</h3>

          <p>
            <strong>Result:</strong> {experience.result}
          </p>

          <p>
            <strong>Interview Mode:</strong> {experience.interview_mode}
          </p>

          <p>
            <strong>Overall Experience:</strong> {experience.overall_experience}
          </p>

          <p>
            <strong>Advice:</strong> {experience.general_advice}
          </p>

          <h4>Rounds</h4>

          {experience.rounds.map((round) => (
            <div key={round.id}>
              <h5>
                Round {round.round_number} - {round.round_type}
              </h5>

              <p>
                <strong>Duration:</strong> {round.duration}
              </p>

              <p>
                <strong>Overview:</strong> {round.overview}
              </p>

              <h5>Questions</h5>

              <ul>
                {round.questions.map((question) => (
                  <li key={question.id}>{question.question_text}</li>
                ))}
              </ul>
            </div>
          ))}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default CompanyDetailsPage;
