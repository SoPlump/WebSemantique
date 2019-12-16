import {sparql} from "./main";

export const getGenreByName = name => {
    return sparql
        .query(`
            select ?uri ?name ?abstract
            WHERE {
                ?uri a yago:WikicatVideoGameGenres;
                rdfs:label ?name;
                dbo:abstract ?abstract.
                FILTER(LangMatches(lang(?name), "en"))
                FILTER(LangMatches(lang(?abstract), "en"))
                FILTER (?uri = <http://dbpedia.org/resource/${name}>)
            }
        `)
        .then(res => {
            const genre = res.results.bindings[0];
            if(genre) {
                return new Promise(resolve => resolve({
                    abstract: genre.abstract.value,
                    name: genre.name.value,
                    uri: genre.uri.value
                }));
            }
            return null;
        })
        .then(genre => {
            if(genre) {
                return sparql
                    .query(`
                    SELECT ?uri ?name WHERE {
                        ?uri a dbo:VideoGame;
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
                                const gameUri = game.uri.value.split('/');
                                const cutUri = '/game/'+gameUri[gameUri.length - 1];
                                return {
                                    name: game.name.value,
                                    uri: game.uri.value,
                                    cutUri: cutUri
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
            select ?uri ?name
            WHERE {
                ?uri a yago:WikicatVideoGameGenres;
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
                        uri: genre.uri.value
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
            SELECT ?uri ?name ?abstract WHERE {
                ?uri a ?type;
                dbo:abstract ?abstract;
                foaf:name ?name.
                FILTER (?uri = <http://dbpedia.org/resource/${name}>)
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
                    uri: studio.uri.value
                }));
            }
            return null;
        })
        .then(studio => {
            if(studio) {
                return sparql
                    .query(`
                    SELECT ?uri ?name WHERE {
                        ?uri a dbo:VideoGame;
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
                                const gameUri = game.uri.value.split('/');
                                const cutUri = '/game/'+gameUri[gameUri.length - 1];
                                return {
                                    name: game.name.value,
                                    uri: game.uri.value,
                                    cutUri: cutUri
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
                    SELECT ?uri ?name WHERE {
                        ?uri a dbo:VideoGame;
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
                                const gameUri = game.uri.value.split('/');
                                const cutUri = '/game/'+gameUri[gameUri.length - 1];
                                return {
                                    name: game.name.value,
                                    uri: game.uri.value,
                                    cutUri: cutUri
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
            SELECT DISTINCT ?uri ?name WHERE {
                ?uri a ?type;
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
                        uri: studio.uri.value
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

export const getSerieByName = (name) => {
    return sparql.query(`
        SELECT ?serie, ?label, ?abstract, ?firstReleaseDate, ?genre, ?genreLabel, ?publisher
        WHERE  {
        ?serie rdfs:label ?label;
        dbo:abstract ?abstract;
        dbp:firstReleaseDate ?firstReleaseDate.
        FILTER (?serie = dbr:${name})
        FILTER (lang(?label) = 'en')
        FILTER (lang(?abstract) = 'en')
        }
    `)
        .then(res => {

            const serie = res.results.bindings[0];
            const cutUri = serie.serie.value.split('/');
            return new Promise(resolve => resolve({
                abstract: serie.abstract.value,
                label: serie.label.value,
                firstReleaseDate: serie.firstReleaseDate.value,
                serie: cutUri[cutUri.length - 1]
            }));
            //return new Promise(resolve => resolve(res));
        })
        .then(serie => {
            return sparql
                .query(`
                    SELECT ?game, ?gameName
                    WHERE {
                    ?game dbo:series dbr:${serie.serie};
                    rdfs:label ?gameName.
                    FILTER (lang(?gameName) = 'en')
                    }
                    LIMIT 10
                `)
                .then(res => {

                    const games = res.results.bindings;
                    let usableGames = [];
                    games.forEach(game => {
                        const gameUri = game.game.value.split('/');
                        const cutUri = '/game/'+gameUri[gameUri.length - 1];
                        usableGames.push({
                            name: game.gameName.value,
                            uri: game.game.value,
                            cutUri: cutUri
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        games: usableGames
                    }));
                })
        })
        .then(serie => {
            return sparql
                .query(`
                SELECT ?genre, ?genreName
                WHERE {
                dbr:${serie.serie} dbp:genre ?genre.
                ?genre rdfs:label ?genreName.
                FILTER (lang(?genreName) = 'en')
                }
                `)
                .then(res => {

                    const genres = res.results.bindings;
                    let usableGenres = [];
                    genres.forEach(genre => {
                        const genreUri = genre.genre.value.split('/');
                        const cutUri = '/genre/'+genreUri[genreUri.length - 1];
                        usableGenres.push({
                            genreName: genre.genreName.value,
                            genre: genre.genre.value,
                            cutUri: cutUri
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        genres: usableGenres
                    }));
                })
        })
        .then(serie => {
            return sparql
                .query(`
                    SELECT ?developer, ?developerName
                    WHERE {
                    dbr:${serie.serie} dbp:developer ?developer.
                    ?developer rdfs:label ?developerName
                    FILTER (lang(?developerName) = 'en')
                    }
                `)
                .then(res => {

                    const developers = res.results.bindings;
                    let usableDevelopers = [];
                    developers.forEach(developer => {
                        const devUri = developer.developer.value.split('/');
                        const cutUri = '/studio/'+devUri[devUri.length - 1];
                        usableDevelopers.push({
                            developer:developer.developer.value,
                            developerName:developer.developerName.value,
                            cutUri: cutUri
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        developers: usableDevelopers
                    }));
                })
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.log(error)
        })
};

export const getAllSeriesByName = (name) => {
    return sparql.query(`
        select distinct ?uri ?name
        WHERE {
            ?game a dbo:VideoGame;
            dbo:series ?uri.
            ?uri rdfs:label ?name.
            FILTER(LangMatches(lang(?name), "en"))
            FILTER contains(lcase(?name), lcase("${name}"))
        }
        `)
        .then(res => {
            let series = res.results.bindings;
            return new Promise(resolve => {
                series = series.map(serie => {
                    return {
                        name: serie.name.value,
                        uri: serie.uri.value
                    };
                });
                resolve(series);
            });
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.error(error);
        });
};
