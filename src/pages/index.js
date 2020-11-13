import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="포스트 목록" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const readingTime = Math.ceil(node.fields.readingTime.minutes)
          const readingText = readingTime + "분 소요"
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{
                      ...scale(1.0),
                      fontWeight: `bold`,
                      color: `#343a40`,
                      textDecoration: `none`,
                      boxShadow: `none`,
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small style={{ color: `#adb5bd` }}>
                  {node.frontmatter.date} • {readingText}
                </small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY년 M월 D일")
            title
            description
          }
          fields {
            readingTime {
              minutes
            }
          }
        }
      }
    }
  }
`
