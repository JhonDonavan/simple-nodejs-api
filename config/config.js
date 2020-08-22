const env = process.env.NODE_ENV || 'dev';

const config = () =>{
    switch (env) {
        case 'dev':
            return {
            bd_string: 'mongodb+srv://***:**********************j@cluster0.kebc9.mongodb.net/***?retryWrites=true&w=majority',
            jwt_pass: 'batatafrita2020',
            jwt_expires_in: '3d'
        }

        case 'hml':
            return {
            bd_string: 'mongodb+srv://***:**********************j@cluster0.kebc9.mongodb.net/***?retryWrites=true&w=majority',
            jwt_pass: 'ALTERAR_TOKEN',
            jwt_expires_in: '3d'
        }

        case 'prod':
            return {
            bd_string: 'mongodb+srv://***:**********************j@cluster0.kebc9.mongodb.net/***?retryWrites=true&w=majority',
            jwt_pass: 'ALTERAR_TOKEN',
            jwt_expires_in: '3d'
        }
    }
}

console.log(`Iniciando a API em ambeinte ${env.toUpperCase()}`);

module.exports = config();