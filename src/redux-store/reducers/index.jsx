const initialState = {
    articles: [],
    remoteArticles: [],
    loader:false
};

function articleReducer(state = initialState, action) {
    if (action.type === "ADD_ARTICLE") {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    }
    console.log(state)
    if (action.type === "API_ERRORED") {
    
        return Object.assign({}, state, {
            remoteArticles: state.remoteArticles.concat(action.payload)
        });
    }
    if (action.type === "TRIGGER_SHOW_TOAST") {
        console.log("actionlol",)
        return {
            ...state,
            loader:!state.loader
        }
    }
    return state;
}

export default articleReducer;