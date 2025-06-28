from pydantic import BaseModel
from typing import List, Optional

class Experience(BaseModel):
    company: str
    position: str
    start_date: Optional[str]
    end_date: Optional[str]
    description: Optional[str]

class Education(BaseModel):
    institution: str
    degree: Optional[str]
    start_year: Optional[str]
    end_year: Optional[str]

class Project(BaseModel):
    title: str
    description: Optional[str]
    technologies: Optional[List[str]]

class Course(BaseModel):
    name: str
    provider: Optional[str]
    year: Optional[str]

class Publication(BaseModel):
    title: str
    journal_or_conference: Optional[str]
    year: Optional[str]
    link: Optional[str]

class ResumeSchema(BaseModel):
    name: str
    email: Optional[str]
    phone: Optional[str]
    skills: List[str]
    education: List[Education]
    experience: List[Experience]
    projects: List[Project]
    courses: List[Course]
    publications: List[Publication]
