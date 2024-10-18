import NewsComment from "@/components/NewsComment";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

export default function NewsDetail() {
  return (
    <section className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex flex-col items-center gap-2 mb-4">
          <h2 className="text-4xl font-bold text-center">
            Bahrain 'Muka Tembok', Sebut Gol Mereka Menit 90+6
          </h2>
          <p className="text-base font-semibold">Bayu Baskoro - Sepakbola</p>
          <p className="text-sm font-normal">Jumat, 11 Okt 2024 06:02 WIB</p>
        </div>
        <div className="mb-10">
          <div className="w-full h-[300px] bg-slate-600"></div>
        </div>
        <div className="text-lg">
          <p>
            Riffa - Timnas Bahrain selamat dari kekalahan melawan Indonesia di
            luar menit injury time. Dilmun's Warriors justru menuliskan gol
            mereka masih di menit injury time. Bahrain vs Indonesia bentrok di
            kualifikasi Piala Dunia 2026, Kamis (10/10/2024) malam WIB. Duel
            yang berlangsung di Bahrain National Stadium itu berakhir imbang
            2-2. Indonesia sesungguhnya sudah unggul 2-1 hingga waktu normal
            habis. Wasit Ahmed Al-Kaf memberikan injury enam menit dan Garuda
            masih mampu mempertahankan keunggulan. Baca artikel sepakbola,
            "Bahrain 'Muka Tembok', Sebut Gol Mereka Menit 90+6" selengkapnya
            https://sport.detik.com/sepakbola/liga-indonesia/d-7582432/bahrain-muka-tembok-sebut-gol-mereka-menit-90-6.
            Download Apps Detikcom Sekarang https://apps.detik.com/detik/
          </p>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="bg-slate-100 p-3 rounded">
          <h3 className="mb-4 font-bold">Tulis Komentar</h3>
          <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
            <textarea
              name=""
              id=""
              rows={4}
              placeholder="Write A Comment..."
              className="bg-transparent w-full resize-none outline-none"
            />
            <div className="ml-auto">
              <Button className="bg-blue-700">
                Kirim
                <SendHorizonal className="ml-2" size={15} />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 p-3 rounded mt-3">
          <h3 className="mb-4">
            <span className="font-bold">Komentar </span> (200)
          </h3>
          <div className="bg-white p-3 rounded-lg flex flex-col gap-3 divide-y">
            {[1, 2, 3].map((news) => (
              <NewsComment key={news} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
