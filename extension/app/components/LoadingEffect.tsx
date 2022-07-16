export const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%"
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150px"
        height="150px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid">
        <path
          d="M15 50A35 35 0 0 0 85 50A35 37.2 0 0 1 15 50"
          fill="#04a777"
          stroke="none">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51.1;360 50 51.1"></animateTransform>
        </path>
      </svg>
    </div>
  )
}
