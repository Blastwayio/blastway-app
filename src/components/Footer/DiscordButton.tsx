const DiscordButton = () => {
    return (
      <a
        href="https://t.co/8MgRzVV0eU"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-[10px] py-[10px] px-6 bg-[#FFF200] hover:bg-[#FFDB00] rounded-[8px] leaading-[26px]"
      >
        <span className="text-[#0e0e0e] text-base font-semibold">
          Join Discord
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
  