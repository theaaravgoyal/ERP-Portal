import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Card from '../../components/Card';
import Input from '../../components/Input';

const Settings = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleVisibility = (field) =>
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (success) setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async update with a brief delay (demo only)
    setTimeout(() => {
      setSuccess(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-8 font-sans max-w-xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account security and preferences.</p>
      </div>

      {/* Change Password Card */}
      <Card>
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shadow-sm shadow-rose-100/40">
            <ShieldCheck size={18} className="text-brand-red" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Change Password</h2>
            <p className="text-xs text-slate-400 mt-0.5">Update your password to keep your account secure.</p>
          </div>
        </div>

        {/* Success Banner */}
        {success && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            <p className="text-sm text-emerald-700 font-medium">Password changed successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Current Password */}
          <div className="relative">
            <Input
              id="currentPassword"
              label="Current Password"
              type={showPasswords.current ? 'text' : 'password'}
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
              placeholder="Enter your current password"
              icon={Lock}
            />
            <button
              type="button"
              onClick={() => toggleVisibility('current')}
              className="absolute right-3 top-[2.15rem] text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Toggle current password visibility"
            >
              {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-rose-50 my-2" />

          {/* New Password */}
          <div className="relative">
            <Input
              id="newPassword"
              label="New Password"
              type={showPasswords.new ? 'text' : 'password'}
              value={form.newPassword}
              onChange={handleChange('newPassword')}
              placeholder="At least 8 characters"
              icon={Lock}
            />
            <button
              type="button"
              onClick={() => toggleVisibility('new')}
              className="absolute right-3 top-[2.15rem] text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Toggle new password visibility"
            >
              {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <Input
              id="confirmPassword"
              label="Confirm New Password"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder="Re-enter your new password"
              icon={Lock}
            />
            <button
              type="button"
              onClick={() => toggleVisibility('confirm')}
              className="absolute right-3 top-[2.15rem] text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Toggle confirm password visibility"
            >
              {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              id="changePasswordSubmit"
              type="submit"
              disabled={loading}
              className="
                flex items-center justify-center gap-2
                w-full sm:w-auto px-8 py-3
                rounded-xl font-semibold text-sm
                bg-gradient-to-r from-brand-red to-rose-400
                text-white shadow-md shadow-rose-200/50
                hover:shadow-lg hover:shadow-rose-300/40 hover:brightness-105
                active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100
              "
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
