import "./Slider.css";

const imgs = [
  "https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/449524332_122162196278153270_2475373512291848145_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFvNHNVchHEVqtP-JJ3rLHvTxF1EudX92pPEXUS51f3asWBxORimN4ssya2-zTOFfqifICxsdmjxjpQjiSiVGPE&_nc_ohc=nPAJ9-a9qvAQ7kNvgE6mgtj&_nc_ht=scontent.fkhi17-1.fna&gid=AfADAgdqBEPcQzei3DMfFGo&oh=00_AYCpqURnIbMqZoTHQhWeKClYSZ9SRQs04Wm2hqIUAML7DQ&oe=668B8A5B",
  "https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/449210622_122162067506153270_2425944293188854010_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFWMuRiIu0snI3ilCZ4uOxBFvBxfWHXqi0W8HF9YdeqLSJ4gEnkORkkBMcPxSLNwoTZlQ3r4MuX8cmxKBO8wnkT&_nc_ohc=gWzXPmATmuAQ7kNvgFan_UI&_nc_ht=scontent.fkhi17-1.fna&oh=00_AYBjUQoZ1HUoygdz1g7RJzNPXj4Y418Wgvdrj7LiwKSrvQ&oe=668B9F28",
  "https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/449680567_122162067932153270_7579794134987052498_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEUBoiiIxXTu3-5BFoUpaFZBX9cN8d1M_UFf1w3x3Uz9TLfTPVRsI7kLywRZYNXYdohMlU9XNHvoYMpCzZs5sfq&_nc_ohc=QRpRdAHGJPsQ7kNvgEhj9Hg&_nc_ht=scontent.fkhi17-1.fna&gid=Ao6_tmn0e1hYCbGLUWmhLwG&oh=00_AYD3HAXwVE_Yf-fe8WfEX9FaZTX-kNROsonH-tnwLbD2Eg&oe=668B7A1C",
  "https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/449679918_122162067956153270_4614321305097027030_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGtmIV50fdIreCrxOB_Is5LcUs46jWxgYZxSzjqNbGBhlFa5TDZuA5vkHK7E25p8tkrrzeBydUGUPKQEGaYONRx&_nc_ohc=QuE3TP-ZJFcQ7kNvgFPJ4iG&_nc_ht=scontent.fkhi17-1.fna&oh=00_AYD_-7fIGq-Yq_pZGds63VhKmqYTZQ1sxNx5Lt5Pfuu8Dw&oe=668B8BF0",
  "https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/449691130_122162067986153270_3573391182464658122_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH79aLHepNtYCpHRfO8g4wMboHgenuzChdugeB6e7MKF8shQyp4oPsjJnoPZ2lPr_eVV7OgB0v3VvA7NLeYvamt&_nc_ohc=WhfJOGRsYc8Q7kNvgH-bMy3&_nc_ht=scontent.fkhi17-1.fna&oh=00_AYA_kq8zkiFPPwuG0dMQYMi-p-nxbcjjNpQF_jkkSE0DpQ&oe=668B80DF",
  "https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/449316640_122161935254153270_5095253346548027701_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF4afm3agq71mvzqcCzf85TdLzpxTPM4P50vOnFM8zg_r-0Ympj3SgP6f710jyBnAF1xEh5C_u3jet4RB4vCM7R&_nc_ohc=5hVPxKuDOEQQ7kNvgHkee-U&_nc_ht=scontent.fkhi17-1.fna&oh=00_AYCN-qQ0OHf7ArpfP5c9AcPUQ_xO4l7OpAqzPqgRLmmgVA&oe=668B7191",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
  "https://framerusercontent.com/images/DK0JHY64ld5iroWptIW0LPbL5sQ.jpeg",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
  "https://framerusercontent.com/images/DK0JHY64ld5iroWptIW0LPbL5sQ.jpeg",
  "https://framerusercontent.com/images/yWMyRINcJBnMUfOegNYcMEaWkMs.jpeg",
  "https://framerusercontent.com/images/NIaYJxjns3DgmzIHQ1ZB6d1P20Y.jpg",
  "https://framerusercontent.com/images/WzRaxWDACs4qY8sMp2YKuWvuOc.jpeg",
  "https://framerusercontent.com/images/mQhnn4Bboa0CI4CCFgnqYv62QA.jpeg",
];

const Slider = () => {
  return (
    <section className="slide-option">
      <div id="infinite" className="highway-slider">
        <div className="container highway-barrier">
          <ul className="highway-lane gap-x-3">
            {imgs.map((img, index) => {
              return (
                <li
                  key={index}
                  className="rounded-2xl highway-car lg:h-[10rem] xl:h-[12rem] overflow-hidden"
                >
                  <span className="relative block w-full h-full">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-40"></span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Slider;
