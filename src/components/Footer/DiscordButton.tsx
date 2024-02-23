const DiscordButton = () => {
  return (
    <a
      href="https://t.co/8MgRzVV0eU"
      target="_blank"
      rel="noopener noreferrer"
      className="leaading-[26px] flex items-center justify-center gap-[10px] rounded-[8px] bg-[#FFF200] px-6 py-[10px] hover:bg-[#FFDB00]"
    >
      <span className="text-base font-semibold text-[#0e0e0e]">Join Discord</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 12.6667L12.6666 3.99997M12.6666 3.99997V12.32M12.6666 3.99997H4.34667"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
};

export default DiscordButton;
