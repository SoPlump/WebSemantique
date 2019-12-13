import {sparql} from "./main";

export const getGenreByName = (name) => {
    return sparql.query(`
        select ?res ?name ?abstract
        WHERE {
            ?res a yago:WikicatVideoGameGenres;
            rdfs:label ?name;
            dbo:abstract ?abstract.
            FILTER(LangMatches(lang(?name), "en"))
            FILTER(LangMatches(lang(?abstract), "en"))
            FILTER (?res = dbr:${name})
        }
    `)
        .then(res => {
            const genre = res.results.bindings[0];
            return new Promise(resolve => resolve({
                abstract: genre.abstract.value,
                name: genre.name.value,
                res: genre.res.value
            }));
            // return new Promise(resolve => resolve(res));
        })
        .then(genre => {
            return sparql
                .query("query")
                .then(res => {
                    return new Promise(resolve => resolve({
                        ...genre,
                        games: res.attribute
                    }));
                })
        })
};
