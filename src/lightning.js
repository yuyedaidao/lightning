import dsbridge from 'dsbridge'

let lightning = {
    call: function(method, args) {
        if (dsbridge.hasNativeMethod(method, 'syn')) {
            let result = dsbridge.call(method, args)
            try {
                return JSON.parse(result)
            } catch(e) {
                console.log(e)
                throw e
            }
        } else if (dsbridge.hasNativeMethod(method, 'asyn')) {
            var promise = new Promise(function(resolve , reject) {
                dsbridge.call(method, args, function(result) {
                    try {
                        resolve(JSON.parse(result))
                    } catch(e) {
                        console.log(e)
                        reject(e)
                    }
                })
            })
            return promise
        } else {
            throw new Error("原生客户端没有实现方法:"+method)
        }
    }
}

export default lightning