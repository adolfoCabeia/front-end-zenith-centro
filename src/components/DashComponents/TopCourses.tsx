import { TopCurso } from "@/types/dashboard";

interface TopCoursesProps {
  data: TopCurso[];
}

export default function TopCourses({ data }: TopCoursesProps) {
  return (
    <div className="top-courses">
      <div className="top-courses-header">
        <h3 className="top-courses-title">Top Cursos</h3>
        <span className="top-courses-subtitle">Mais populares</span>
      </div>

      <div className="top-courses-list">
        {data.map((curso, i) => (
          <div key={i} className="top-courses-item">
            <div className="top-courses-rank">{i + 1}</div>
            <div className="top-courses-info">
              <span className="top-courses-name">{curso.curso}</span>
              <div className="top-courses-progress">
                <div 
                  className="top-courses-progress-bar" 
                  style={{ width: `${Math.min((curso.totalAlunos / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
            <span className="top-courses-alunos">{curso.totalAlunos} alunos</span>
          </div>
        ))}
      </div>
    </div>
  );
}