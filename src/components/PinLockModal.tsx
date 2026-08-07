import React, { useState } from 'react';
import { Lock, Unlock, AlertCircle, X } from 'lucide-react';
import { AppSettings } from '../types';

interface PinLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const PinLockModal: React.FC<PinLockModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'unlock' | 'change'>('unlock');

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.pinCode) {
      onUpdateSettings({ isUnlocked: true });
      setError('');
      setPinInput('');
      onClose();
    } else {
      setError('Código PIN incorrecto (PIN por defecto: 1234)');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput !== settings.pinCode) {
      setError('El PIN actual no coincide.');
      return;
    }
    if (newPin.length < 4) {
      setError('El nuevo PIN debe tener al menos 4 dígitos.');
      return;
    }
    onUpdateSettings({ pinCode: newPin, isUnlocked: true });
    alert('¡Código PIN actualizado con éxito!');
    setPinInput('');
    setNewPin('');
    setError('');
    onClose();
  };

  const handleLockNow = () => {
    onUpdateSettings({ isUnlocked: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-sm shadow-xl overflow-hidden p-5 text-zinc-800 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Seguridad y Código PIN</h3>
              <p className="text-[11px] text-zinc-500 font-medium">Proteger las notas con clave</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-zinc-100 p-1 rounded-xl text-xs border border-zinc-200">
          <button
            onClick={() => setActiveTab('unlock')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'unlock' ? 'bg-white text-indigo-700 shadow-xs' : 'text-zinc-500'
            }`}
          >
            {settings.isUnlocked ? 'Estado' : 'Desbloquear'}
          </button>
          <button
            onClick={() => setActiveTab('change')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'change' ? 'bg-white text-indigo-700 shadow-xs' : 'text-zinc-500'
            }`}
          >
            Cambiar PIN
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab 1: Unlock or Status */}
        {activeTab === 'unlock' && (
          <div>
            {settings.isUnlocked ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <Unlock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">Las notas están desbloqueadas</h4>
                  <p className="text-xs text-zinc-600 mt-1 font-medium">
                    Puedes bloquear la aplicación en cualquier momento para proteger la intimidad de las notas.
                  </p>
                </div>
                <button
                  onClick={handleLockNow}
                  className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Bloquear Ahora
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifyPin} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Ingresa el PIN de 4 dígitos
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Ej: 1234"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-center text-lg tracking-widest text-zinc-900 focus:outline-none focus:border-indigo-600 shadow-xs font-mono font-bold"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1.5 text-center font-medium">
                    (PIN inicial por defecto: <strong className="text-indigo-600">1234</strong>)
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Desbloquear
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Change PIN */}
        {activeTab === 'change' && (
          <form onSubmit={handleChangePin} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">PIN Actual</label>
              <input
                type="password"
                placeholder="****"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:border-indigo-600 shadow-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Nuevo PIN</label>
              <input
                type="password"
                placeholder="4 a 6 números"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:border-indigo-600 shadow-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Guardar Nuevo PIN
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

