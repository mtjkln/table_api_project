const Header = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "15vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        flexDirection: "column",
      }}
    >
      <div style={{ color: "white", fontSize: "36px" }}>React Tables</div>
      <div style={{ color: "white", fontSize: "20px", marginTop: "5px" }}>
        Using React, Redux and Material UI
      </div>
      <div style={{ color: "white", fontSize: "20px", marginTop: "5px" }}>
        By Mritunjay Kalyan - +918877887781
      </div>
    </div>
  );
};

export default Header;
