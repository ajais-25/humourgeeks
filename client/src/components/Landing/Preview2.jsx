import Preview2 from "../../assets/Preview2.jpg";
import Preview3 from "../../assets/Preview3.png";
import Preview4 from "../../assets/Preview4.png";

const articles = [
  {
    date: "Jan 25, 2025",
    title: "TOP Punchline Section",
    description:
      "A section where you can see the top voted punchiles for a particular setup.",
    image: Preview2,
    bgColor: "bg-yellow-100",
  },
  {
    date: "Feb 18, 2025",
    title: "AI Powered Humour Result Generator",
    description:
      "What if you had a creative AI partner to help you generate results for your punchiles, here it is HumourGeeks's AI powered Humour Result Generator.",
    image: Preview3,
    bgColor: "bg-yellow-100",
  },
  {
    date: "Coming Soon",
    title: "Open Mic",
    description:
      "What if texting felt as real as talking? Watch messages unfold live, just like they’re thinking out loud.",
    image: Preview4,
    bgColor: "bg-yellow-100",
  },
];

const HumourGeeksCards = () => {
  return (
    <section className="py-16 px-8 bg-white ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 ">
        {articles.map((article, index) => (
          <div key={index} className="text-center ">
            <div
              className={`w-full h-64 flex items-center justify-center ${article.bgColor} rounded-lg`}
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg h-full w-full object-contain hover:scale-110"
                />
              ) : (
                <div className="text-white font-bold text-lg">
                  Image Not Available
                </div>
              )}
            </div>
            <p className="text-gray-500 mt-4">{article.date}</p>
            <h3 className="text-xl font-bold mt-2">{article.title}</h3>
            <p className="text-gray-600 mt-2">{article.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HumourGeeksCards;
