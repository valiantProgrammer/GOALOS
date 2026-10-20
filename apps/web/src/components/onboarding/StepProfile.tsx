import React, { useRef } from "react";
import { Sparkles, Shield, Flame } from "lucide-react";
import { useOnboardingStore, HunterClass } from "@/stores/useOnboardingStore";

export function StepProfile() {
  const {
    hunterName,
    displayName,
    bio,
    hunterClass,
    avatarUrl,
    updateData,
  } = useOnboardingStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be smaller than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateData({ avatarUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const classes: {
    id: HunterClass;
    label: string;
    isPink?: boolean;
    iconSvg: React.ReactNode;
  }[] = [
    {
      id: "shadow",
      label: "Shadow",
      iconSvg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 21 7.5 21 16.5 12 22 3 16.5 3 7.5 12 2" />
          <polygon points="12 6 17 10 17 14 12 18 7 14 7 10 12 6" fill="#3b82f6" fillOpacity="0.25" />
          <circle cx="12" cy="12" r="2" fill="#60a5fa" />
        </svg>
      ),
    },
    {
      id: "mage",
      label: "Mage",
      iconSvg: <Flame className="w-5 h-5 text-[#94a3b8]" />,
    },
    {
      id: "fighter",
      label: "Fighter",
      iconSvg: <Shield className="w-5 h-5 text-[#94a3b8]" />,
    },
    {
      id: "rogue",
      label: "Rogue",
      isPink: true,
      iconSvg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" className="text-[#d946ef]" />
          <path d="M12 7l-4 10h8l-4-10z" strokeWidth="1.8" />
          <line x1="9" y1="14" x2="15" y2="14" strokeWidth="1.8" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full max-w-[540px]">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-wide">
          Create Your Hunter Profile
        </h1>
        <p className="text-[13px] text-[#8fa3c7] mt-0.5">
          Let&apos;s set up your identity and preferences.
        </p>
      </div>

      {/* Main Form Area: Left Avatar + Right Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-6 items-center mt-5">
        {/* Left Sub-Panel: Avatar + Upload */}
        <div className="flex flex-col items-center">
          <div className="relative w-[110px] h-[110px] rounded-full p-[3px] bg-gradient-to-tr from-[#2563eb] via-[#8b5cf6] to-[#38bdf8] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0a1224]">
              <img
                src={avatarUrl}
                alt="Hunter Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleAvatarUpload}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 px-3 py-1.5 rounded-lg bg-[#0a1224]/80 border border-[#233b6e]/50 hover:border-[#3b82f6]/60 text-white text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#38bdf8]" />
            <span>Upload Avatar</span>
          </button>
        </div>

        {/* Right Sub-Panel: Fields */}
        <div className="flex flex-col gap-2.5">
          {/* Hunter Name */}
          <div>
            <label className="text-[12px] font-medium text-[#9fb0d0]">
              Hunter Name
            </label>
            <input
              type="text"
              value={hunterName}
              maxLength={20}
              onChange={(e) => updateData({ hunterName: e.target.value })}
              placeholder="e.g. Rupayan"
              className="w-full h-9 px-3 mt-1 rounded-[8px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] outline-none focus:border-[#3b82f6] transition-all"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="text-[12px] font-medium text-[#9fb0d0]">
              Display Name (Optional)
            </label>
            <input
              type="text"
              value={displayName}
              maxLength={30}
              onChange={(e) => updateData({ displayName: e.target.value })}
              placeholder="e.g. Rupayan Dey"
              className="w-full h-9 px-3 mt-1 rounded-[8px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] outline-none focus:border-[#3b82f6] transition-all"
            />
          </div>

          {/* Bio (Optional) */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-medium text-[#9fb0d0]">
                Bio (Optional)
              </label>
              <span className="text-[11px] text-[#64748b]">
                {bio.length}/100
              </span>
            </div>
            <input
              type="text"
              value={bio}
              maxLength={100}
              onChange={(e) => updateData({ bio: e.target.value })}
              placeholder="Discipline creates freedom."
              className="w-full h-9 px-3 mt-1 rounded-[8px] bg-[#0a1224] border border-[#233b6e]/50 text-white text-[13px] outline-none focus:border-[#3b82f6] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Select Your Class */}
      <div className="mt-5">
        <label className="text-[12px] font-medium text-[#9fb0d0] block mb-2">
          Select Your Class
        </label>
        <div className="grid grid-cols-4 gap-2.5">
          {classes.map((cls) => {
            const isSelected = hunterClass === cls.id;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => updateData({ hunterClass: cls.id })}
                className={`flex flex-col items-center justify-center p-2.5 rounded-[9px] transition-all duration-200 outline-none cursor-pointer ${
                  isSelected
                    ? cls.isPink
                      ? "bg-[#1f1028] border border-[#d946ef] shadow-[0_0_15px_rgba(217,70,239,0.4)] text-white"
                      : "bg-[#0e1c38] border border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.4)] text-white"
                    : "bg-[#0a1224] border border-[#203666]/40 text-[#869ab8] hover:border-[#3b82f6]/50 hover:text-white"
                }`}
              >
                <div
                  className={`mb-1 transition-colors ${
                    isSelected
                      ? cls.isPink
                        ? "text-[#d946ef]"
                        : "text-[#38bdf8]"
                      : "text-[#64748b]"
                  }`}
                >
                  {cls.iconSvg}
                </div>
                <span
                  className={`text-[12px] font-medium ${
                    isSelected ? "text-white" : "text-[#94a3b8]"
                  }`}
                >
                  {cls.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
