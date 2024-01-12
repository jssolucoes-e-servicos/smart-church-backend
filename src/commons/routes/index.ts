const ead = `/ead`;

const routes = {
  //route: `/route`,
  auth: `/auth`,
  church: `/church`,
  churchLinks: `/church-links`,
  correios: `/correios`,
  //EAD
  //EAD | COURSES
  eadCourses: `${ead}/courses`,
  eadCoursesClasses: `${ead}/courses-classes`,
  eadCoursesGroups: `${ead}/courses-groups`,
  eadCoursesLessons: `${ead}/courses-lessons`,
  //EAD | Studants
  eadStudants: `${ead}/studandts`,
  eadStudantsOnClasees: `${ead}/studandts-on-classes`,

  plains: `/plains`,
  persons: `/persons`,
  platforms: `/platforms`,
  preserve: `/preserve`,
  tfa: `/auth/tfa`,
};

export default routes;
