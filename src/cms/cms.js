import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import SciencePostPreview from './preview-templates/SciencePostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'

import { SlidesControl, SlidesPreview } from "./Slides.js";
import { ScienceControl, SciencePreview } from "./Science.js";

CMS.registerWidget("slides", SlidesControl, SlidesPreview);
CMS.registerWidget("science", ScienceControl, SciencePreview);

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('science', SciencePostPreview)

