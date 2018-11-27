const axios = require('axios');
const crypto = require('crypto');

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  { actions },
) => {
  const { createNode } = actions;

  // fetch raw data from the theMoviesDB api
  const fetchMovies = () => axios.get(`https://api.themoviedb.org/4/list/96181?page=1&api_key=33ee74526d9cc83db3e2c3b5420f32e4`);
  // await for results
  const res = await fetchMovies();

  // map into these results and create nodes
  res.data.results.map(async (movie, i) => {


    const movieNode = {
      // Required fields
      id: `${i}`,
      parent: '__SOURCE__',
      internal: {
        type: 'Movie', // name of the graphQL query --> allMovie {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      name: {
        title: movie.title,
        rating: movie.vote_average,
        overview: movie.overview,
        genres: movie.genre_ids,
        releaseDate: movie.release_date,
        popularity: movie.popularity,
      },
      url: `https://image.tmdb.org/t/p/w780${movie.poster_path}`

    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash('md5')
      .update(JSON.stringify(movieNode))
      .digest('hex');
    // add it to userNode
    movieNode.internal.contentDigest = contentDigest;



    // Create node with the gatsby createNode() API
    createNode(movieNode);
  });
};


exports.onCreateNode = async ({ node, actions, store, cache }) => {
  if (node.internal.type !== "Movie") {
    return
  }

  const { createNode } = actions

  const fileNode = await createRemoteFileNode({
    url: node.url,
    store,
    cache,
    createNode,
    createNodeId: id => `movie-image-${id}`,
  })

  if (fileNode) {
    node.image___NODE = fileNode.id
  }
}
