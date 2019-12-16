import {sparql} from "./main";

export const getGameByName = (name) => {
    return sparql.query(`
        SELECT ?res ?name ?abstract min(?releaseDate) as ?date WHERE {
        ?res a dbo:VideoGame.
        OPTIONAL {?res foaf:name ?name.}
        OPTIONAL {?res dbo:abstract ?abstract.}
        OPTIONAL {?res dbo:releaseDate ?releaseDate.}
        
        
        FILTER langMatches(lang(?name), 'en')
        FILTER langMatches(lang(?abstract), 'en')
        FILTER (?res = <http://dbpedia.org/resource/${name}>)
        }
    `)
        .then(res => {
            const game = res.results.bindings[0];

            return new Promise(resolve => resolve({
                uri: game.res.value || null,
                name: game.name.value || null,
                abstract: game.abstract.value || null,
                releaseDate: game.date.value || null
            }));
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT ?artistName WHERE {
                        ?res a dbo:VideoGame.
                        
                        ?res dbo:gameArtist ?artist.
                        
                        OPTIONAL {?artist rdfs:label ?artistName.}

                        FILTER langMatches(lang(?artistName), 'en')
                        filter(?res = <${game.uri}>)
                    }
                `)
                .then(res => {
                    const artists = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameArtists: artists.map(artists => {
                            return {
                                artistName: artists.artistName.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                SELECT ?composerName WHERE {
                    ?uri a dbo:VideoGame.
                    
                    ?uri dbo:composer ?composer.
                    
                    OPTIONAL {?composer rdfs:label ?composerName.}
                    
                    FILTER langMatches(lang(?composerName), 'en')
                    filter(?uri = <${game.uri}>)
                }
                `)
                .then(res => {
                    const composers = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameComposers: composers.map(composers => {
                            return {
                                composerName: composers.composerName.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                SELECT ?directorName WHERE {
                    ?uri a dbo:VideoGame.
                    
                    ?uri dbo:director ?director.
                    
                    OPTIONAL {?director rdfs:label ?directorName.}
                    
                    FILTER langMatches(lang(?directorName), 'en')
                    filter(?uri = <${game.uri}>)
                }
                `)
                .then(res => {
                    const directors = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameDirectors: directors.map(directors => {
                            return {
                                directorName: directors.directorName.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT ?publisherName ?publisher WHERE {
                        ?uri a dbo:VideoGame.
                        
                        ?uri dbo:publisher ?publisher.
                        
                        OPTIONAL {?publisher rdfs:label ?publisherName.}
                        
                        FILTER langMatches(lang(?publisherName), 'en')
                        filter(?uri = <${game.uri}>)
                    }
                `)
                .then(res => {
                    const publishers = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gamePublishers: publishers.map(publishers => {
                            return {
                                publisherName: publishers.publisherName.value,
                                publisherUri: publishers.publisher.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT ?developerName ?developer WHERE {
                        ?uri a dbo:VideoGame.
                        
                        ?uri dbo:developer ?developer.
                        
                        OPTIONAL {?developer rdfs:label ?developerName.}
                        
                        FILTER langMatches(lang(?developerName), 'en')
                        filter(?uri = <${game.uri}>)
                    }
                `)
                .then(res => {
                    const developers = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameDevelopers: developers.map(developers => {
                            return {
                                developerName: developers.developerName.value,
                                developerUri: developers.developer.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT ?serieName ?serie WHERE {
                        ?uri a dbo:VideoGame.
                        
                        ?uri dbo:series ?serie.
                        
                        OPTIONAL {?serie rdfs:label ?serieName.}
                        
                        FILTER langMatches(lang(?serieName), 'en')
                        filter(?uri = <${game.uri}>)
                    }
                `)
                .then(res => {
                    const series = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameSeries: series.map(series => {
                            return {
                                serieName: series.serieName.value,
                                serieUri: series.serie.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT ?genreName ?genre WHERE {
                        ?uri a dbo:VideoGame.
                        
                        ?uri dbo:genre ?genre.
                        
                        OPTIONAL {?genre rdfs:label ?genreName.}
                        
                        FILTER langMatches(lang(?genreName), 'en')
                        filter(?uri = <${game.uri}>)
                    }
                `)
                .then(res => {
                    const genres = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameGenres: genres.map(genres => {
                            return {
                                genreName: genres.genreName.value,
                                genreUri: genres.genre.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT max(?mc) as ?mcCritic max(?ign) as ?ignCritic max(?gs) as ?gspotCritic WHERE {
                        ?uri a dbo:VideoGame.
                        
                        OPTIONAL {?uri dbp:ign ?ign}
                        OPTIONAL {?uri dbp:gspot ?gs}
                        OPTIONAL {?uri dbp:mc ?mc}
                        
                        filter(?uri = <${game.uri}>)
                    }
                `)
                .then(res => {
                    const critics = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameCritics: critics.map(critics => {
                            return {
                                mcCritic: critics.mcCritic.value,
                                ignCritic: critics.ignCritic.value,
                                gspotCritic: critics.gspotCritic.value
                            }
                        })
                    }))
                })
        })
};

export const getAllGamesByName = name => {
    return sparql
        .query(`
            select distinct ?res ?name min(?releaseDate) as ?date
            WHERE {
                ?res a dbo:VideoGame;
                rdfs:label ?name.
                OPTIONAL {?res dbo:releaseDate ?releaseDate.}
                FILTER(LangMatches(lang(?name), "en"))
                FILTER contains(lcase(?name), lcase("${name}"))
            }
        `)
        .then(res => {
            let games = res.results.bindings;
            return new Promise(resolve => {
                games = games.map(game => {
                    return {
                        name: game.name.value,
                        uri: game.res.value,
                        local_uri: 'game/' + game.res.value.split('/').pop()
                    };
                });
                resolve(games);
            });
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.error(error);
        });
};
