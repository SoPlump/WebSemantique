import {sparql} from "./main";

export const findGenreByName = (name) => {
    return sparql.query(`
        select ?res ?name ?abstract
        WHERE {
            ?res a yago:WikicatVideoGameGenres;
            rdfs:label ?name;
            dbo:abstract ?abstract.
            FILTER(LangMatches(lang(?name), "en"))
            FILTER(LangMatches(lang(?abstract), "en"))
            FILTER (?res = <http://dbpedia.org/resource/${name}>)
        }
        `)
        .then(res => {
            const genre = res.results.bindings[0];
            return new Promise(resolve => resolve({
                abstract: genre.abstract.value,
                name: genre.name.value,
                res: genre.res.value
            }));
        })
        .then(genre => {
            if(genre) {
                return sparql
                    .query(`
                        SELECT ?res ?name WHERE {
                            ?res a dbo:VideoGame;
                            dbo:genre ?genre;
                            rdfs:label ?name.
                            FILTER(?genre = <${genre.res}>)
                            FILTER(LangMatches(lang(?name), "en"))
                        } LIMIT 10
                    `)
                    .then(res => {
                        const games = res.results.bindings;
                        return new Promise(resolve => resolve({
                            ...genre,
                            games: games.map(game => {
                                return {
                                    name: game.name.value,
                                    res: game.res.value
                                }
                            })
                        }));
                    });
            }
            return null;
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.error(error);
        });
};

export const findAllGenresByName = (name) => {
    return sparql.query(`
        select ?res ?name ?abstract
        WHERE {
            ?res a yago:WikicatVideoGameGenres;
            rdfs:label ?name.
            FILTER(LangMatches(lang(?name), "en"))
            FILTER contains(lcase(?name), lcase("${name}"))
        }
        `)
        .then(res => {
            let genres = res.results.bindings;
            return new Promise(resolve => {
                genres = genres.map(genre => {
                    return {
                        name: genre.name.value,
                        res: genre.res.value
                    };
                });
                resolve(genres);
            });
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.error(error);
        });
};
