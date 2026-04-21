import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import membersData from '../data.json';
import {
  ArrowLeftIcon,
  MoreVerticalIcon,
  PhoneIcon,
  MailIcon,
  ReceiptIcon,
  GiftIcon,
  CheckCircleIcon,
} from '../../../components/ui/icons';

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = membersData.find(m => m.id === parseInt(id));

  if (!member) {
    return <div className="p-8 text-center">Member not found</div>;
  }

  const getLevelStyle = (level) => {
    switch(level) {
      case 'GOLD': return 'bg-[#B46A0B] text-white'; 
      case 'SILVER': return 'bg-[#94A3B8] text-white';
      case 'BRONZE': return 'bg-[#D97706] text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5F9] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F0F5F9] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col pb-24">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#F0F5F9] sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-white/50 p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 flex-1 justify-center -ml-2">
            <h1 className="text-[19px] font-extrabold text-[#11263C]">Member Details</h1>
          </div>
          <button className="text-[#0D74C8] hover:bg-white/50 p-2 rounded-full transition-colors -mr-2">
            <MoreVerticalIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="px-5 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center gap-5 relative">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-[#C8E0F4] flex items-center justify-center border-2 border-white shadow-sm">
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#0A6CBF] font-bold text-2xl">{member.initials}</span>
                )}
              </div>
              {/* Verified Badge */}
              <div className="absolute bottom-0 right-0 bg-[#0D74C8] rounded-full p-0.5 border-2 border-white">
                <CheckCircleIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-[20px] font-extrabold text-[#11263C] leading-none">{member.name}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide ${getLevelStyle(member.level)}`}>
                  {member.level}
                </span>
              </div>
              <p className="text-[13px] text-slate-500 font-medium mb-1.5">Member ID: {member.memberId}</p>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${member.status === 'Active Account' ? 'bg-[#10B981]' : 'bg-slate-400'}`}></div>
                <span className="text-xs font-bold text-[#10B981]">{member.status}</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#E3F0FA] rounded-3xl p-5 flex flex-col justify-center">
              <p className="text-[11px] font-bold text-[#5C7C9E] tracking-wider uppercase mb-1">Total Poin</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#0D74C8]">{member.points}</span>
                <span className="text-sm font-bold text-[#0D74C8]">pts</span>
              </div>
            </div>
            <div className="bg-[#E3F0FA] rounded-3xl p-5 flex flex-col justify-center">
              <p className="text-[11px] font-bold text-[#5C7C9E] tracking-wider uppercase mb-1">Member Sejak</p>
              <span className="text-[17px] font-medium text-[#11263C]">{member.joinedDate}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[13px] font-bold text-[#5C7C9E] uppercase tracking-wider px-1">Contact Information</h3>
            <div className="bg-white rounded-3xl p-5 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-[#F0F5F9] p-3 rounded-full flex items-center justify-center text-[#0D74C8]">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#5C7C9E] uppercase tracking-wider mb-0.5">Phone Number</p>
                  <p className="text-[14px] font-bold text-[#11263C]">{member.phone}</p>
                </div>
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <div className="flex items-center gap-4">
                <div className="bg-[#F0F5F9] p-3 rounded-full flex items-center justify-center text-[#0D74C8]">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#5C7C9E] uppercase tracking-wider mb-0.5">Email Address</p>
                  <p className="text-[14px] font-bold text-[#11263C]">{member.email}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button 
                onClick={() => navigate(`/member/${member.id}/edit`)}
                className="text-[14px] font-bold text-[#0D74C8] hover:underline"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[13px] font-bold text-[#5C7C9E] uppercase tracking-wider">Riwayat Transaksi Terakhir</h3>
              <button 
                onClick={() => navigate(`/member/${member.id}/transactions`)}
                className="text-[13px] font-bold text-[#0D74C8] hover:underline"
              >
                See All
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {member.transactions && member.transactions.length > 0 ? (
                member.transactions.map((trx, index) => (
                  <div 
                    key={index} 
                    onClick={() => navigate(`/transaction/${trx.trxId || trx.id}`)}
                    className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-[#E3F0FA] w-12 h-12 rounded-full flex items-center justify-center text-[#0D74C8]">
                        <ReceiptIcon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold text-[#11263C]">{trx.id}</span>
                        <span className="text-[12px] text-slate-500 font-medium">{trx.date} • {trx.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[14px] font-bold text-[#11263C]">{trx.amount}</span>
                      <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">{trx.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">Belum ada transaksi.</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Fixed Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center bg-transparent z-20 pointer-events-none">
          <div className="w-full max-w-[440px] md:max-w-3xl px-5 py-6 flex gap-4 pointer-events-auto bg-gradient-to-t from-[#F0F5F9] via-[#F0F5F9] to-transparent">
            <button 
              onClick={() => navigate(`/member/${member.id}/edit`)}
              className="flex-1 bg-[#B9D7F3] hover:bg-[#A8CCEE] text-[#0A6CBF] font-bold py-4 rounded-2xl transition-colors"
            >
              Edit Member
            </button>
            <button className="flex-1 bg-[#0A6CBF] hover:bg-[#095BA3] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#0A6CBF]/30">
              <GiftIcon className="w-5 h-5" />
              Tukar Poin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
