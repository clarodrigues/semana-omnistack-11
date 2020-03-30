const connection = require('../database/connection');

module.exports = {

    async index(req, res){

        //parametro para gerar paraginação
        const { page = 1 } = req.query;
    
        //contando todos os registros
        var [ count ] = await connection('incidents').count();

        console.log(count);

        //para utilizar paginação, usar o limit e offset
        const incident = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1) * 5)
            .select(
                'incidents.*'
                , 'ongs.name'
                , 'ongs.email'
                , 'ongs.whatsapp'
                , 'ongs.city'
                , 'ongs.uf'
            );

        res.header('X-Total-Count', count['count(*)']);
        return res.json(incident);
    },

    async create(req, res){
        
        const { title, description, value } = req.body;
        // ong_id virá pelo header da requisição
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id });
    },

    async delete(req, res){

        //obtendo o parametro id
        const { id } = req.params;
        //obtendo o id da ong logada
        const ong_id = req.headers.authorization;

        //fazendo um select para obter o ong_id para verificar se é do mesmo que a ong que está solicitando
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        console.log(incident);

        if (incident.ong_id != ong_id){
            //devolvendo o status 401 Não autorizado
            return res.status(401).json({ error: "Operação não permitida!" });
        }

        await connection('incidents').where('id', id).delete();

        //resposta 204 sucesso sem conteudo
        return res.status(204).send();
    }

}