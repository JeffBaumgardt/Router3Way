export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = reddit => ({
	type: SELECT_REDDIT,
	reddit
})

export const requestPosts = reddit => ({
	type: REQUEST_POSTS,
	reddit
})

export const recievePosts = (reddit, json) => ({
	type: RECIEVE_POSTS,
	reddit,
	posts: json.data.children.map(child => child.data),
	recievedAt: Date.now()
})

export const invalidateReddit = reddit => ({
	type: INVALIDATE_REDDIT,
	reddit
})

const fetchPosts = reddit => dispatch => {
	dispatch(requestPosts(reddit))
    console.log(`Fetching ${reddit}`)
	return fetch(`https://www.reddit.com/r/${reddit}.json`)
	.then(response => response.json())
	.then(json => dispatch(recievePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
	const posts = state.postsByReddit[reddit]

	if (!posts) {
		return true
	}
	if (posts.isFetching) {
		return false
	}
	return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
	if (shouldFetchPosts(getState(), reddit)) {
		return dispatch(fetchPosts(reddit))
	}
}
