import { useEffect, useState } from "react";
import styles from './Formulario.module.css';

export default () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState(null);
    const [classificacao, setClassificacao] = useState('');

    const tabelaIMC = [
        { min: 0, max: 18.5, texto: "Abaixo do peso" },
        { min: 18.5, max: 24.9, texto: "Peso normal" },
        { min: 25, max: 29.9, texto: "Sobrepeso" },
        { min: 30, max: 34.9, texto: "Obesidade grau 1" },
        { min: 35, max: 39.9, texto: "Obesidade grau 2" },
        { min: 40, max: Infinity, texto: "Obesidade grau 3" },
    ];


    const calcularIMC = () => {
        const convAltura = parseFloat(altura.replace(',', '.') / 100);
        const convPeso = parseFloat(peso.replace(',', '.'));

        if (!convAltura || !convPeso) {
            alert("Digite valores válidos!");
            return;
        }
        const imc = (convPeso / (convAltura * convAltura)).toFixed(2);
        setResultado(imc);


        // Achar a classificação na tabela
        const classificacaoEncontrada = tabelaIMC.find(
            (item) => imc >= item.min && imc < item.max
        );

        setClassificacao(classificacaoEncontrada ? classificacaoEncontrada.texto : '');

    };

    // Esse useEffect limpa o resultado se os campos ficarem vazios
    useEffect(() => {
        if (peso === '' || altura === '') {
            setResultado(null);
        }
    }, [peso, altura]);

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <div className={styles.inputsGroup}>
                    <div className={styles.inputsItem}>
                        <label>Peso (kg):</label>
                        <input type="number" placeholder='Ex: 70' onChange={(e) => setPeso(e.target.value)} />
                    </div>
                    <div className={styles.inputsItem}>
                        <label>Altura (cm):</label>
                        <input type="number" placeholder='Ex: 180' onChange={(e) => setAltura(e.target.value)} />
                    </div>
                </div>

                <button onClick={calcularIMC}>Calcular</button>
            </form>

            {resultado && (
                <>
                    <div className={styles.resultadoView}>
                        <h2>Resultado</h2>
                        <p>Seu IMC é: <strong>{resultado}</strong></p>
                        <p>Classificação: <strong>{classificacao}</strong></p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className={styles.titleTable} colSpan={2}>Tabela de Classificação do IMC</th>
                            </tr>
                            <tr>
                                <th className={styles.titleTable}>IMC</th>
                                <th className={styles.titleTable}>Classificação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabelaIMC.map(({ min, max, texto }) => {
                                const faixa = max === Infinity ? `${min}+` : `${min} - ${max}`;
                                const destacado = classificacao === texto;

                                return (
                                    <tr key={texto} className={destacado ? styles.hoverCellTable : styles.cellTable}>
                                        <td className={styles.cellTable}>{faixa}</td>
                                        <td className={styles.cellTable}>{texto}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}
