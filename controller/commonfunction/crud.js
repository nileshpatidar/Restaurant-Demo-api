module.exports = {
    getAll: (Schema, query) => {
        return new Promise(function (resolve, reject) {
            Schema.find(query)
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('getAll Error :', error);
                    reject(error);
                });
        });
    },
    getBy: (Schema, jsonObject) => {
        return new Promise(function (resolve, reject) {
            Schema.findOne(jsonObject)
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('getAll Error :', error);
                    reject(error);
                });
        });
    },
    getById: (Schema, id) => {
        return new Promise(function (resolve, reject) {
            Schema.findById({ _id: id })
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('getAll Error :', error);
                    reject(error);
                });
        });
    },
    addData: (Schema, reqData) => {
        return new Promise(function (resolve, reject) {
            schema = new Schema(reqData);
            schema.save()
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('addData Error :', error);
                    reject(error);
                });
        });
    },
    updateDataByid: (Schema, id, reqData) => {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate(
                {
                    _id: id
                },
                reqData,
                {
                    new: true
                })
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('updateData Error :', error);
                    reject(error);
                });
        });
    },
    updateData: (Schema, arg, reqData) => {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate(
                arg,
                reqData,
                {
                    new: true
                })
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('updateData Error :', error);
                    reject(error);
                });
        });
    },
    deleteData: (Schema, id) => {

        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    status: "deleted"
                },
                {
                    new: true
                })
                .then((data) => {
                    resolve(data);
                })
                .catch(error => {
                    console.log('getAll Error :', error);
                    reject(error);
                });
        });
    }
}