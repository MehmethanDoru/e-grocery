export default function CreditCardPreview({ cardDetails, isFlipped }) {
    return (
        <div className="hidden md:block ml-[7%] w-full md:w-1/2 max-w-md mt-0">
            <div className={`relative w-full aspect-[1.586/1] transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="w-full h-full absolute backface-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#064c4f] via-[#0a5c60] to-[#045d61] rounded-3xl p-6 flex flex-col justify-between">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                        
                        <div className="flex justify-between items-center relative z-10">
                            <div className="w-12 h-12 text-white opacity-80">
                                <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.813 2C2.647 2 0 4.648 0 7.813v10.375C0 21.352 2.648 24 5.813 24h14.375C23.352 24 26 21.352 26 18.187V7.813C26 4.649 23.352 2 20.187 2H5.813zm0 2h14.375C22.223 4 24 5.777 24 7.813V9h-6c-.555 0-1-.445-1-1c0-.555.445-1 1-1a1 1 0 1 0 0-2c-1.645 0-3 1.355-3 3c0 1.292.844 2.394 2 2.813v4.968c-1.198.814-2 2.18-2 3.719c0 .923.293 1.781.781 2.5H10.22a4.439 4.439 0 0 0 .78-2.5c0-1.538-.802-2.905-2-3.719v-4.969c1.156-.418 2-1.52 2-2.812c0-1.645-1.355-3-3-3H6a1 1 0 0 0-.094 0a1.001 1.001 0 0 0-.093 0A1.004 1.004 0 0 0 6 7h2c.555 0 1 .445 1 1c0 .555-.445 1-1 1H2V7.812C2 5.777 3.777 4 5.813 4zM2 11h5v4H2v-4zm17 0h5v4h-5v-4zM2 17h4.5C7.839 17 9 18.161 9 19.5S7.839 22 6.5 22h-.688C3.777 22 2 20.223 2 18.187V17zm17.5 0H24v1.188C24 20.223 22.223 22 20.187 22H19.5c-1.339 0-2.5-1.161-2.5-2.5s1.161-2.5 2.5-2.5z" fill="currentcolor" />
                                </svg>
                            </div>
                            <div className="w-16 h-16">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g fillRule="evenodd">
                                        <circle r={7} fill="#fff" cy={12} cx={7} />
                                        <circle r={7} fillOpacity=".8" fill="#ffa200" cy={12} cx={17} />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        
                        <div className="flex justify-start text-2xl font-bold tracking-[0.2em] text-white relative z-10 font-mono whitespace-nowrap">
                            {cardDetails.number || '•••• •••• •••• ••••'}
                        </div>
                        
                        <div className="flex justify-between uppercase relative z-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-white/70">CARD HOLDER</span>
                                <span className="text-lg font-bold text-white">{cardDetails.name || 'YOUR NAME'}</span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs text-white/70">EXPIRES</span>
                                <span className="text-lg text-white font-mono">{cardDetails.expiry || 'MM/YY'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full absolute backface-hidden rotate-y-180 rounded-3xl">
                    <div className="w-full h-full bg-gradient-to-br from-[#064c4f] via-[#0a5c60] to-[#045d61] shadow-2xl rounded-3xl">
                        <div className="w-full h-14 bg-black mt-0 rounded-t-3xl"></div>
                        <div className="px-6 mt-8">
                            <div className="flex justify-end items-center gap-2">
                                <div className="h-10 flex-grow bg-slate-100/90"></div>
                                <div className="bg-slate-700/30 rounded px-4 py-2 w-20 text-center">
                                    <span className="font-mono text-white text-lg">
                                        {cardDetails.cvv || 'CVV'}
                                    </span>
                                </div>
                            </div>
                            <div className="text-white/50 text-xs mt-4">
                                Your CVV number is the last 3 digits on the back of your card
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}