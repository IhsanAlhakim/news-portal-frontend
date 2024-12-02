export default function Footer() {
  return (
    <footer className="mt-auto py-6 bg-gray-800 text-white  text-center ">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">IHSAN ALHAKIM</span>. All Rights Reserved.
      </p>
    </footer>
  );
}
