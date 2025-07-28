import frontPage from './front-page';
import page from './page';
import single from './single';
import project from './project';
import archive from './archive';
import singlePractice from './single-practice';
import practicesLanding from './template-Practices-landing';
import attorneysLanding from './template-Attorneys-landing';
import singleAttorney from './single-attorney';

const templates = {
  page,
  single,
  project,
  archive,
  'front-page': frontPage,
  "template-Practices-landing": practicesLanding,
  "template-Attorneys-landing": attorneysLanding,
  "single-practice": singlePractice,
  "single-attorney": singleAttorney
};

export default templates;