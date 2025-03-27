import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ nome: '', cidade: '' });
  const [modelo, setModelo] = useState('');
  const [largura, setLargura] = useState(100);
  const [comprimento, setComprimento] = useState(200);

  const avancar = () => setStep(prev => prev + 1);
  const voltar = () => setStep(prev => prev - 1);

  const modelos = [
    { nome: 'Resina', img: '/resina.jpg' },
    { nome: 'Clásico', img: '/clasico.jpg' },
    { nome: 'Cascata', img: '/cascata.jpg' },
    { nome: 'Demolição', img: '/demolicao.jpg' },
    { nome: 'Redonda', img: '/redonda.jpg' },
  ];

  const calcularValor = () => {
    const area = (largura * comprimento) / 10000;
    if (modelo === 'Resina') return `Gs ${(area * 139800).toLocaleString()}`;
    if (modelo === 'Demolição') return `Gs ${(area * 100000).toLocaleString()}`;
    if (modelo === 'Redonda') return `USD ${(largura === 100 ? 480 : largura === 150 ? 720 : largura === 180 ? 960 : 1200).toFixed(2)}`;
    return `Gs ${(area * 139800).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <img src="/logo.png" alt="RS Schaefer Logo" className="h-12" />
        <h1 className="text-2xl font-bold text-blue-900">Simulador RS Schaefer</h1>
      </header>

      <main className="flex flex-col items-center justify-center py-10 px-4">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold text-center mb-4">Monte sua mesa</h2>
            <input type="text" placeholder="Nome" name="nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="w-full border p-2 mb-3" />
            <input type="text" placeholder="Cidade" name="cidade" value={form.cidade} onChange={e => setForm({ ...form, cidade: e.target.value })} className="w-full border p-2 mb-3" />
            <button onClick={avancar} className="w-full bg-blue-700 text-white py-2 rounded">Avançar</button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {modelos.map(m => (
              <div key={m.nome} onClick={() => { setModelo(m.nome); avancar(); }} className="cursor-pointer hover:scale-105 transition">
                <img src={m.img} alt={m.nome} className="rounded-xl shadow-md" />
                <p className="text-center font-semibold mt-2">{m.nome}</p>
              </div>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Escolha as medidas</h3>
            <input type="number" placeholder="Largura (cm)" value={largura} onChange={e => setLargura(Number(e.target.value))} className="w-full border p-2 mb-3" />
            <input type="number" placeholder="Comprimento (cm)" value={comprimento} onChange={e => setComprimento(Number(e.target.value))} className="w-full border p-2 mb-3" />
            <div className="flex justify-between">
              <button onClick={voltar} className="bg-gray-500 text-white px-4 py-2 rounded">Voltar</button>
              <button onClick={avancar} className="bg-blue-700 text-white px-4 py-2 rounded">Ver resumo</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-xl shadow-xl max-w-xl w-full">
            <h3 className="text-2xl font-bold text-center mb-6">Resumo do seu orçamento</h3>
            <ul className="space-y-2">
              <li><strong>Cliente:</strong> {form.nome}</li>
              <li><strong>Cidade:</strong> {form.cidade}</li>
              <li><strong>Modelo:</strong> {modelo}</li>
              <li><strong>Medidas:</strong> {largura}cm x {comprimento}cm</li>
              <li><strong>Valor estimado:</strong> {calcularValor()}</li>
            </ul>
            <div className="flex flex-col gap-4 mt-6">
              <a href={`https://wa.me/595991234567?text=Olá! Quero uma mesa ${modelo} de ${largura}x${comprimento}cm. Sou ${form.nome} de ${form.cidade}. Valor: ${calcularValor()}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">Enviar para WhatsApp</a>
              <button onClick={() => window.print()} className="bg-gray-700 text-white py-2 px-4 rounded">Gerar PDF</button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}