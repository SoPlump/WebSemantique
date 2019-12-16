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
            /*eslint-disable no-console*/
            console.log(game.res);
            let cutGameUri = game.res.value.split('/');
            const gameUri = '/game/'+cutGameUri[cutGameUri.length - 1];

            return new Promise(resolve => resolve({
                uri: game.res.value || null,
                name: (game.name != null ? game.name.value : ""),
                abstract: (game.abstract != null ? game.abstract.value : ""),
                releaseDate: (game.date != null ? game.date.value : ""),
                cutUri: gameUri
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
                }).then( game => {
                    let cutGameUri = game.uri.split('/');
                    const gameUri = cutGameUri[cutGameUri.length - 1];
                    let uriList = "";

                    game.gameSeries.forEach( serie => {
                        let cutUri = serie.serieUri.split('/');
                        const uri = cutUri[cutUri.length - 1];
                        /*eslint-disable no-console*/
                        console.log(uri);
                        uriList = uriList + "dbr:"+uri+",";
                    });


                    uriList = uriList.slice(0, -1);
                    /*eslint-disable no-console*/
                    console.log("URI : " + uriList);
                    return sparql.query(
                        `
                        select distinct ?game ?label
                        where {
                        ?game dbo:series ?serie;
                        rdfs:label ?label.
                        FILTER(?game != dbr:${gameUri})
                        FILTER(?serie in (${uriList}))
                        FILTER langMatches(lang(?label), 'en')
                        }
                        LIMIT 10`
                    )
                        .then(res => {
                            const gameFromSeries = res.results.bindings;
                            return new Promise(resolve => resolve({
                                ...game,
                                otherGamesFromSameSerie: gameFromSeries.map(game => {
                                    let cutGameUri = game.game.value.split('/');
                                    const gameUri = '/game/'+cutGameUri[cutGameUri.length - 1];
                                    return {
                                        name: game.label.value,
                                        uri: game.game.value,
                                        cutUri:gameUri
                                    }
                                })
                            }))
                        })
                }).then( game => {
                    let cutGameUri = game.uri.split('/');
                    const gameUri = cutGameUri[cutGameUri.length - 1];
                    let uriList = "";

                    game.gameGenres.forEach( genre => {
                        let cutUri = genre.genreUri.split('/');
                        const uri = cutUri[cutUri.length - 1];
                        /*eslint-disable no-console*/
                        console.log(uri);
                        uriList = uriList + "dbr:"+uri+",";
                    });

                    uriList = uriList.slice(0, -1);
                    /*eslint-disable no-console*/
                    console.log("URI : " + uriList);
                    return sparql.query(
                        `
                        select distinct ?game ?label
                        where {
                        ?game dbp:genre ?genre;
                        rdfs:label ?label.
                        FILTER(?game != dbr:${gameUri})
                        FILTER(?genre in (${uriList}))
                        FILTER langMatches(lang(?label), 'en')
                        }
                        LIMIT 10`
                    )
                        .then(res => {
                            const gameFromGenres = res.results.bindings;
                            return new Promise(resolve => resolve({
                                ...game,
                                otherGamesFromSameGenre: gameFromGenres.map(game => {
                                    let cutGameUri = game.game.value.split('/');
                                    const gameUri = '/game/'+cutGameUri[cutGameUri.length - 1];
                                    return {
                                        name: game.label.value,
                                        uri: game.game.value,
                                        cutUri: gameUri
                                    }
                                })
                            }))
                        })
                }).then( game => {
                    let cutGameUri = game.uri.split('/');
                    const gameUri = cutGameUri[cutGameUri.length - 1];
                    let uriList = "";

                    game.gameDevelopers.forEach( dev => {
                        let cutUri = dev.developerUri.split('/');
                        const uri = cutUri[cutUri.length - 1];
                        /*eslint-disable no-console*/
                        console.log(uri);
                        uriList = uriList + "dbr:"+uri+",";
                    });

                    uriList = uriList.slice(0, -1);
                    /*eslint-disable no-console*/
                    console.log("URI : " + uriList);
                    return sparql.query(
                        `
                        select distinct ?game ?label
                        where {
                        ?game dbp:developer ?genre;
                        rdfs:label ?label.
                        FILTER(?game != dbr:${gameUri})
                        FILTER(?genre in (${uriList}))
                        FILTER langMatches(lang(?label), 'en')
                        }
                        LIMIT 10`
                    )
                        .then(res => {

                            const gameFromDevs = res.results.bindings;
                            return new Promise(resolve => resolve({
                                ...game,
                                otherGamesFromSameDeveloper: gameFromDevs.map(game => {
                                    let cutGameUri = game.game.value.split('/');
                                    const gameUri = '/game/'+cutGameUri[cutGameUri.length - 1];
                                    return {
                                        name: game.label.value,
                                        uri: game.game.value,
                                        cutUri: gameUri
                                    }
                                })
                            }))
                        })
                })
                .then(game => {
                    return sparql
                        .query(`
                    SELECT ?producerName ?producer WHERE {
                        ?uri a dbo:VideoGame.
                        
                        ?uri dbo:producer ?producer.
                        
                        OPTIONAL {?producer rdfs:label ?producerName.}
                        
                        FILTER langMatches(lang(?producerName), 'en')
                        filter(?uri = <${game.uri}>)
                    }
                `)
                        .then(res => {
                            const producers = res.results.bindings;
                            return new Promise(resolve => resolve({
                                ...game,
                                gameProducers: producers.map(producer => {
                                    return {
                                        producerName: producer.producerName.value,
                                        producerUri: producer.producer.value
                                    }
                                })
                            }))
                        })
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
                        uri: game.res.value
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
