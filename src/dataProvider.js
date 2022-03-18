/* eslint-disable import/no-anonymous-default-export */

const fetchDataList = (url: string, pages: Number) => {   
    return (fetchDataListOnePage(url, 1, pages, 0))
}

const fetchDataListOnePage = (url: string, page: Number, max_page: Number, total: Number, offset = '', formattedData = true) => {
    // page: first page to fetch
    // max_pages: last page to fetch
    return fetch(url + `&offset=${offset}&api_key=keysF0s3bC0g7ODOW`)
			.then(res => res.json())
			.then(res => {
                total += res.records ? res.records.length : 0
                if (res.offset && page < max_page) {
                    //console.log('in if', page, max_page)
                    return (fetchDataListOnePage(url, page + 1, max_page, total, res.offset));
                } else {
                    if (formattedData) {
                        var records = res.records.map(record => record['fields']);
                        const data = {data: records, total: res.offset ? total + 1 : total}
                        //console.log('fetch page ', page, max_page, data)
                        return data
                    } else {
                        return (res)
                    }
                }
			})
            .catch(error => console.log(error))
}

const fetchDataListPages = async (url: string, max = 10000) => {
    console.log('fetch pages', url, max)
    let per_page = 100
    let page = 1
    let offset = ''
    let total = 0
    let records = []
    console.log(offset && (page * per_page < max))
    while ( page === 1 || (offset && (page * per_page < max))) {
        let res = await fetchDataListOnePage(url, page, page, total, offset, false)
        offset = res.offset
        total += offset ? per_page : (res.records ? res.records.length : 0)
        page ++
        records = records.concat(res.records.map(record => record['fields']))
    }
    return ({data: records, total: total})
}

const fetchDataOne = async (url: string) => {
    return fetch(url + "?api_key=keysF0s3bC0g7ODOW")
			.then(res => res.json())
			.then(res => {
                const data = {data: res['fields']}
                console.log('fetched data one: ', url, data)
                return data;
			})
            .catch(error => console.log(error))
}


const createData = (url: string, data: Object) => {
    return fetch(url + "?api_key=keysF0s3bC0g7ODOW", 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
			.then(res => res.json())
			.then(res => {
                var records = res.records.map(record => record['fields']);
                const data = {data: records[0]}
                //console.log('created record: ', data)
                return data;
			})
            .catch(error => console.log(error))
}

const updateData = (url: string, data: Object) => {
    return fetch(url + "?api_key=keysF0s3bC0g7ODOW", 
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
			.then(res => res.json())
			.then(res => {
                var records = res.records.map(record => record['fields']);
                const data = {data: records[0]}
                //console.log('updated record: ', data)
                return data;
			})
            .catch(error => console.log(error))
}

const updateDataMany = (url: string, data: Object) => {
    return fetch(url + "?api_key=keysF0s3bC0g7ODOW", 
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
			.then(res => res.json())
			.then(res => {
                var ids = res.records.map(record => record['id']);
                const data = {data: ids}
                //console.log('updated record: ', data)
                return data;
			})
            .catch(error => console.log(error))
}

const deleteDataMany = (url: string) => {
    return fetch(url + "&api_key=keysF0s3bC0g7ODOW", 
        {
            method: 'DELETE'
        })
			.then(res => res.json())
			.then(res => {
                var ids = res.records.map(record => record['id']);
                const data = {data: ids}
                //console.log('deleted records: ', data)
                return data;
			})
            .catch(error => console.log(error))
}

const deleteData = (url: string) => {
    return fetch(url + "&api_key=keysF0s3bC0g7ODOW", 
        {
            method: 'DELETE'
        })
			.then(res => res.json())
			.then(res => {
                const data = {data: res.records}
                //console.log('deleted records: ', data)
                return data;
			})
            .catch(error => console.log(error))
}

const getFilterFormula = (filter) => {
    var filterByFormula = "";
    var counter = 1;
    var view = ''
    // if view in object, get it off
    if ('view' in filter) {
        view = `&view=${filter['view']}`
        delete filter.view;
    }
    const size = filter && Object.keys(filter).length;
    if (size > 1) {
        filterByFormula += size > 1 ? 'AND(' : '';
        Object.keys(filter).forEach(key => {
            filterByFormula += `{${key}}='${filter[key]}'`
            if (size > 1) {
                filterByFormula += (counter === size) ? ')' : ', ';
            }
            counter ++;
        });
    }
    if (size === 1) {
        filterByFormula += `{${Object.keys(filter)[0]}}='${filter[Object.keys(filter)[0]]}'`
    }
    return(filterByFormula + view)
}

export default (
    apiUrl: string
    ): customDataProvider => ({

    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const filter = params.filter;
        console.log('get liste', perPage)
        // filter
        
        let filterByFormula = getFilterFormula(filter)

        // sort
        const sort = `sort%5B0%5D%5Bfield%5D=${field}&sort%5B0%5D%5Bdirection%5D=${order.toLowerCase()}`;


        if (perPage > 100) {
            const url = `${apiUrl}/${resource}?pageSize=${100}&${sort}&filterByFormula=${filterByFormula}`;
            return (fetchDataListPages(url, perPage))
        } else {
            const url = `${apiUrl}/${resource}?pageSize=${perPage}&${sort}&filterByFormula=${filterByFormula}`;
            return (fetchDataList(url, page))
        }        

    },


    getOne: (resource, params) => {
        //console.log('get one', params, resource)
        const url = `${apiUrl}/${resource}/${params.id}`;
        return fetchDataOne(url)
    },

    getMany: (resource, params) => {
        //console.log('in get many ', params)
        const ids = params.ids;
        let size = ids.length;
        var filterByFormula = "";
        var counter = 1;
        if (size > 1) {
            filterByFormula += size > 1 ? 'OR(' : '';
            ids.forEach(id => {
                filterByFormula += `{id} = '${id}'`
                if (size > 1) {
                    filterByFormula += (counter === size) ? ')' : ', ';
                }
                counter ++;
            });
        }
        if (size === 1) {
            filterByFormula += `{id} ='${ids[Object.keys(ids)[0]]}'`
        }
    const url = `${apiUrl}/${resource}?filterByFormula=${filterByFormula}`;
    return (fetchDataList(url, size < 100 ? size : 100));
    },

    getManyReference: (resource, params) => {
        const target = params.target;
        const id = params.id;
        const filter = params.filter;
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        let list_filter = { [target]: id, ...filter }
        //console.log(target, list_filter)

        // filter
        let filterByFormula = getFilterFormula(list_filter)

        // sort
        const sort = `sort%5B0%5D%5Bfield%5D=${field}&sort%5B0%5D%5Bdirection%5D=${order.toLowerCase()}`;

        const url = `${apiUrl}/${resource}?pageSize=${perPage}&${sort}&filterByFormula=${filterByFormula}`;
        return fetchDataList(url, page)
    },


    create: (resource, params) => {
        const data = params.data;

        let url = `${apiUrl}/${resource}`
        let new_data = { records: [ { fields: data } ]}

        return createData(url, new_data);
    },

    updateMany: (resource, params) => {
        const ids = params.ids;
        const data = params.data;

        let url = `${apiUrl}/${resource}`;
        let records = [];
        ids.forEach( id => {
            records.push({ id: id, fields: data })
        })
        let new_data = { records: records }

        return (updateDataMany(url, new_data))
    
    },

    update: (resource, params) => {
        //console.log('update resource data', resource, params)
        const id = params.id;
        const data = params.data;

        let url = `${apiUrl}/${resource}`;
        let new_data = { records: [{ id: id, fields: data }] }
        //console.log('update', new_data)


        return (updateData(url, new_data))
    },

    deleteMany: (resource, params) => {
        const ids = params.ids;

        let url = `${apiUrl}/${resource}?records[]=${ids[0]}`;

        for (var i=1; i < ids.length; i++) {
            url += '&records[]=' + ids[i];
        }

        return (deleteDataMany(url))
    
    },

    delete: (resource, params) => {
        const id = params.id;

        let url = `${apiUrl}/${resource}?records[]=${id}`;


        return (deleteData(url))
    }
});