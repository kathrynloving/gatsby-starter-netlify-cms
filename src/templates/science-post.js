import React, { Component } from "react";
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import SmilesDrawer from 'smiles-drawer'

export const SciencePostTemplate = ({
  content,
  contentComponent,
  description,
  molecule,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <p>Input: {molecule}</p>
            <canvas width="200" height="200" data-smiles={molecule}></canvas>
            <img src="https://source.unsplash.com/random/400x200" alt="" />{" "}
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
    
  )
}

SciencePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  molecule: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const SciencePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SciencePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        molecule={post.frontmatter.molecule}
        helmet={
          <Helmet
            titleTemplate="%s | Science"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

SciencePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

// Draw molecules, if possible
SmilesDrawer.apply()

export default SciencePost

export const pageQuery = graphql`
  query SciencePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        molecule
        tags
      }
    }
  }
`
