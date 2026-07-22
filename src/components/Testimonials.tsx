import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, PlusCircle, Sparkles, UserCheck } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  designation: string;
  message: string;
  date: string;
  avatarUrl?: string;
}

interface TestimonialsProps {
  isLoggedIn: boolean;
  loggedInUser: string;
  onNavigate: (view: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ isLoggedIn, loggedInUser, onNavigate }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 't-1',
      name: 'Naa Anyema I',
      role: 'NGOs',
      designation: 'Queen Mother, Ashongman Traditional Area',
      message: 'Umoja Foundation’s Community Education Center and the modern sanitation complexes have transformed our girls’ security and attendance. For the first time, our young women do not stay home during their monthly cycles.',
      date: '2026-03-12',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
    },
    {
      id: 't-2',
      name: 'Hon. Emmanuel Adjei',
      role: 'district assembly',
      designation: 'District Assembly Representative, Eastern Region',
      message: 'The water audit reports provided by Umoja gave our assembly the clear, verifiable baseline data we needed to allocate rural development funds accurately. A phenomenal data-driven partner.',
      date: '2026-04-05',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'
    },
    {
      id: 't-3',
      name: 'Dr. Evelyn Mensah',
      role: 'researcher',
      designation: 'Senior Lecturer, School of Public Health, UG',
      message: 'Our research team tracked a 38% increase in attendance retention rates in schools equipped with Umoja’s solar-powered WASH stations and dignity supplies. The evidence is clear and inspiring.',
      date: '2026-05-18',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200'
    },
    {
      id: 't-4',
      name: 'Sarah Jenkins',
      role: 'donor',
      designation: 'Global Philanthropy Circle Sponsor',
      message: 'Complete transparent accounting is rare in international development. Seeing exactly how my contributions mapped directly to lockable privacy blocks at Danyame Junior High was extremely reassuring.',
      date: '2026-06-01',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('donor');
  const [formDesignation, setFormDesignation] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Available roles for dropdown as requested
  const roles = [
    { value: 'donor', label: 'Donor' },
    { value: 'NGOs', label: 'NGOs' },
    { value: 'district assembly', label: 'District Assembly' },
    { value: 'admin', label: 'Admin' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'student', label: 'Student' },
    { value: 'others', label: 'Others' }
  ];

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    const newTestimonial: Testimonial = {
      id: `t-${Date.now()}`,
      name: formName,
      role: formRole,
      designation: formDesignation || `${formRole.toUpperCase()} Partner`,
      message: formMessage,
      date: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200` // default pleasant avatar placeholder
    };

    setTestimonials((prev) => [...prev, newTestimonial]);
    setFormName('');
    setFormDesignation('');
    setFormMessage('');
    setSubmitSuccess(true);
    setCurrentIndex(testimonials.length); // Jump to the newly added testimonial
    setIsAutoPlaying(false);

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-12 py-6" id="testimonials-section">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="font-sans font-bold text-xs uppercase tracking-widest text-terracotta">Community Voices</span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-dark-blue">
          Feedback From Ground Partners
        </h2>
        <p className="font-sans text-sm text-gray-500">
          Durable community transformation is powered by collaboration. Here is what our sponsors, local administrators, and researchers report.
        </p>
      </div>

      {/* Rotating Testimonials Card Container */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="relative bg-sand-bg border border-clay rounded-3xl p-8 sm:p-12 shadow-sm min-h-[250px] flex flex-col justify-between overflow-hidden">
          {/* Big quotation accent */}
          <div className="absolute top-4 right-6 text-clay/20 select-none">
            <Quote className="w-24 h-24 stroke-[1.5]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 relative z-10"
            >
              <p className="font-sans text-base sm:text-lg text-dark-blue leading-relaxed italic">
                "{testimonials[currentIndex].message}"
              </p>

              <div className="flex items-center space-x-4 pt-4 border-t border-clay/60">
                {testimonials[currentIndex].avatarUrl && (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-clay bg-white">
                    <img 
                      src={testimonials[currentIndex].avatarUrl} 
                      alt={testimonials[currentIndex].name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-display font-bold text-sm text-dark-blue">{testimonials[currentIndex].name}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-xs">
                    <span className="font-sans font-semibold text-terracotta uppercase tracking-wide">
                      {testimonials[currentIndex].role}
                    </span>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="font-sans text-gray-500">
                      {testimonials[currentIndex].designation}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controllers */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-clay/40 relative z-20">
            <div className="flex space-x-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'bg-terracotta w-6' : 'bg-clay'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl border border-clay bg-white hover:bg-clay/50 text-dark-blue flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-xl border border-clay bg-white hover:bg-clay/50 text-dark-blue flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Authentication Form Module */}
      <div className="max-w-xl mx-auto px-4 pt-4" id="testimonial-form-module">
        {isLoggedIn ? (
          <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-2.5 text-terracotta">
              <UserCheck className="w-5 h-5" />
              <h3 className="font-display font-bold text-lg text-dark-blue">Share Your Partner Testimonial</h3>
            </div>

            <p className="font-sans text-xs text-gray-500">
              Logged in as <strong className="text-dark-blue">{loggedInUser}</strong>. Your feedback will be instantly integrated into the rotating showcase above.
            </p>

            {submitSuccess && (
              <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl font-sans text-xs flex items-center space-x-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span>Testimonial successfully applied to the carousel loop! Check it out above.</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Your Full Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Ama Serwaa"
                  className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-sm text-dark-blue focus:outline-none focus:border-terracotta font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Community Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-dark-blue text-sm focus:outline-none focus:border-terracotta font-medium"
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Organization or Designation</label>
                  <input
                    type="text"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    placeholder="e.g. Parent-Teacher Association Head"
                    className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-sm text-dark-blue focus:outline-none focus:border-terracotta font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">Testimonial Message</label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Write your feedback here..."
                  className="w-full px-3.5 py-2.5 border border-clay rounded-xl bg-white text-sm text-dark-blue focus:outline-none focus:border-terracotta h-24 resize-none font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Feedback Card</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-clay/10 border border-clay/60 rounded-2xl p-6 text-center space-y-4">
            <h4 className="font-display font-bold text-sm text-dark-blue">Are You an Umoja Partner or Stakeholder?</h4>
            <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Log in to your account to share feedback with our international donor community. We accept reviews from donors, volunteers, assembly planners, researchers, and students.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="px-5 py-2 bg-dark-blue hover:bg-terracotta text-white font-display font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Sign In To Leave Testimonial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
