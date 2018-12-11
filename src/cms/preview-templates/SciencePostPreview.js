import React from 'react'
import PropTypes from 'prop-types'
import { SciencePostTemplate } from '../../templates/science-post'

const SciencePostPreview = ({ entry, widgetFor }) => (
  <SciencePostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    molecule={entry.getIn(['data', 'molecule'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

SciencePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SciencePostPreview
