import "../styles/global.css"

export default function Login(){
    return(
        <div className="logines">
            <div className="login2">

            </div>

            <div className="login">
                <h1>Seja bem vindo</h1>
                <input
                    type="usuario"
                    placeholder="Digite seu usuário"
                    className="inputs"
                />

                <input
                    type="senha"
                    placeholder="Digite sua senha"
                    className="inputs"
                />
            </div>
        </div>
    )
}