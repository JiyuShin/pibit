import styled from 'styled-components';
import Image from 'next/image';

const ProjectCard = styled.div`
  margin-bottom: 3rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.66%; /* 3:2 비율 */
  overflow: hidden;
  background-color: #f5f5f5;
  
  img {
    object-fit: cover;
  }
`;

const ProjectInfo = styled.div`
  padding: 1rem 0;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
`;

const ProjectCategory = styled.p`
  color: #666;
  margin: 0.5rem 0 0;
`;

export default function Project({ title, category, imageSrc }) {
  return (
    <ProjectCard>
      <ProjectImage>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ProjectImage>
      <ProjectInfo>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectCategory>{category}</ProjectCategory>
      </ProjectInfo>
    </ProjectCard>
  );
} 