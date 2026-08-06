import React from 'react'
import Image from 'next/image'
import LinkButton from '../LinkButton'
import TLInfoPanelDecorative from '../TLInfoPanelDecorative'
export default function CommunityServicesSection() {
  return (
   <section className="bg-gradient-to-b pb-24 -mt-0.5 from-[#4A74D8] to-[#214DB0] min-h-screen w-screen flex flex-col justify-center items-center relative z-10">
         <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 md:p-8 w-[90%] md:w-[80%] flex justify-center items-center">
           <div className="flex flex-col justify-center items-center z-1 bg-gradient-to-b rounded-lg border-2 from-[#FFD7AB] to-[#FFE6CD] w-full min-h-full p-4">
             <Image
               alt="achievement text"
               width={300}
               draggable={false}
               height={300}
               src={"/achievements/achievement-text.svg"}
               className="mt-4 w-[90%] xl:w-1/3 h-auto"
             />
             <h3 className="text-lg md:text-xl text-center text-[#543737] font-pixelify">{`Explore IMT people's achievements!`}</h3>
   
             <div className="w-full h-full my-8 flex justify-center gap-4 items-center">
               
             </div>
           </div>
          <LinkButton size="xl" extraClass="absolute -bottom-3 z-5" href="/achievements">{"see more !"}</LinkButton>
          <TLInfoPanelDecorative>{"QUEST BOARD"}</TLInfoPanelDecorative>
         </div>
       </section>
  )
}
