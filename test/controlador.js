const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:8080';
const body = require('./requests/request.json');

describe('Pruebas de integración | /wanashop/generador/pdf/reportes/', () => {

    it('CASO 1 Solicitud exitosa', function(done){
        this.timeout(30000);
        chai.request(url)
            .post('/wanashop/generador/pdf/reportes/')
            .send(body)
            .set('nombre_aplicativo', 'confirmacion_spei')
            .set('identificador_usuario', 'test@frd.org.mx')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('mensaje');
                expect(res.body).to.have.property('resultado');
                done();
            })
        })

    it('CASO 2 Formulario no valido', function(done){
        this.timeout(30000);
        chai.request(url)
        .post('/wanashop/generador/pdf/reportes/')
        .send({})
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('mensaje');
            done();
        })
    })
})