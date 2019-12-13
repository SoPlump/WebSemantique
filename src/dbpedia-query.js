import {sparql} from "./main";

export const getGenreByName = name => {
    return sparql
        .query(`
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
            if(genre) {
                return new Promise(resolve => resolve({
                    abstract: genre.abstract.value,
                    name: genre.name.value,
                    uri: genre.res.value
                }));
            }
            return null;
        })
        .then(genre => {
            if(genre) {
                return sparql
                    .query(`
                    SELECT ?res ?name WHERE {
                        ?res a dbo:VideoGame;
                        dbo:genre ?genre;
                        rdfs:label ?name.
                        FILTER(?genre = <${genre.uri}>)
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
                                    uri: game.res.value
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

export const getAllGenresByName = name => {
    return sparql
        .query(`
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

export const getStudioByName = name => {
    return sparql
        .query(`
            SELECT ?res ?name ?abstract WHERE {
                ?res a ?type;
                dbo:abstract ?abstract;
                foaf:name ?name.
                FILTER (?res = <http://dbpedia.org/resource/${name}>)
                FILTER(LangMatches(lang(?abstract), "en"))
                FILTER(LangMatches(lang(?name), "en"))
                FILTER(?type = yago:WikicatVideoGamePublishers || ?type = yago:WikicatVideoGameDevelopmentCompanies)
            }
        `)
        .then(res => {
            const studio = res.results.bindings[0];
            if(studio) {
                return new Promise(resolve => resolve({
                    name: studio.name.value,
                    abstract: studio.abstract.value,
                    uri: studio.res.value
                }));
            }
            return null;
        })
        .then(studio => {
            if(studio) {
                return sparql
                    .query(`
                    SELECT ?res ?name WHERE {
                        ?res a dbo:VideoGame;
                        dbo:genre ?genre;
                        rdfs:label ?name;
                        dbo:developer ?developer.
                        FILTER(?developer = <${studio.uri}>)
                        FILTER(LangMatches(lang(?name), "en"))
                    } LIMIT 10
                    `)
                    .then(res => {
                        const games = res.results.bindings;
                        return new Promise(resolve => resolve({
                            ...studio,
                            developedGames: games.map(game => {
                                return {
                                    name: game.name.value,
                                    uri: game.res.value
                                }
                            })
                        }));
                    });
            }
            return null;
        })
        .then(studio => {
            if(studio) {
                return sparql
                    .query(`
                    SELECT ?res ?name WHERE {
                        ?res a dbo:VideoGame;
                        dbo:genre ?genre;
                        rdfs:label ?name;
                        dbo:publisher ?publisher.
                        FILTER(?publisher = <${studio.uri}>)
                        FILTER(LangMatches(lang(?name), "en"))
                    } LIMIT 10
                    `)
                    .then(res => {
                        const games = res.results.bindings;
                        return new Promise(resolve => resolve({
                            ...studio,
                            publishedGames: games.map(game => {
                                return {
                                    name: game.name.value,
                                    uri: game.res.value
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

export const getAllStudiosByName = name => {
    return sparql
        .query(`
            SELECT ?res ?name WHERE {
                ?res a ?type;
                foaf:name ?name.
                FILTER contains(lcase(?name), lcase("${name}"))
                FILTER(LangMatches(lang(?name), "en"))
                FILTER(?type = yago:WikicatVideoGamePublishers || ?type = yago:WikicatVideoGameDevelopmentCompanies)
            }
        `)
        .then(res => {
            let studios = res.results.bindings;
            return new Promise(resolve => {
                studios = studios.map(studio => {
                    return {
                        name: studio.name.value,
                        res: studio.res.value
                    };
                });
                resolve(studios);
            });
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.error(error);
        });
};
