export const styleDiv: React.CSSProperties = {
    position: 'relative',
    width: "100%",
    overflow: 'hidden'
}
export const styleDiv1: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
}

export const motionDiv: React.CSSProperties =
{
    position: 'absolute',
    top: '20px',
    left: '10px',
    opacity: 0.3,
    color: 'white'
}


export const motionDiv1: React.CSSProperties =
{
    position: 'absolute', // absolute
    bottom: '5rem', // bottom-20 (20 * 0.25rem = 5rem)
    right: '2.5rem', // right-10 (10 * 0.25rem = 2.5rem)
    opacity: 0.2, // opacity-20
    color: 'white', // text-white
}

export const div2: React.CSSProperties =
{
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '1rem',
}
export const motionDiv2: React.CSSProperties =
{
    width: '100%', // w-full
    maxWidth: '64rem', // max-w-4xl (4xl = 64rem)
}

export const card: React.CSSProperties =
{
    backdropFilter: 'blur(20px)', // תוכל לשנות את הערך לפי הצורך
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // שקיפות של 10%
    border: 'none',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)', // תוכל לשנות את הערכים לפי הצורך
    overflow: 'hidden',
}
export const div3: React.CSSProperties =
{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(128, 0, 128, 0.2))', // צבעים עבור blue-500 ו-purple-500 עם שקיפות של 20%
    zIndex: 0,
}
export const cardContent: React.CSSProperties =

{
    position: 'relative',
    zIndex: 10,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '4rem', // 16px
    paddingBottom: '4rem', // 16px
    paddingLeft: '1.5rem', // 6px
    paddingRight: '1.5rem', // 6px
}
export const div4: React.CSSProperties =

{
    position: 'relative',
    width: '8rem', // 32px
    height: '8rem', // 32px
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
export const motionDiv3: React.CSSProperties =

{
    backgroundImage: 'linear-gradient(to right, #2563eb, #6d28d9)', // bg-gradient-to-r from-blue-600 to-purple-600
    padding: '1.5rem', // p-6
    borderRadius: '9999px', // rounded-full
    marginBottom: '2rem', // mb-8
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
}
export const motionH1: React.CSSProperties =

{
    fontSize: '2.25rem', // text-4xl
    fontWeight: 'bold', // font-bold
    textAlign: 'center', // text-center
    marginBottom: '1.5rem', // mb-6
    backgroundImage: 'linear-gradient(to right, #3b82f6, #d946ef, #ec4899)', // bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400
    WebkitBackgroundClip: 'text', // bg-clip-text
    color: 'transparent', // text-transparent
}
export const motionH2: React.CSSProperties =

{
    fontSize: '1.25rem', // text-xl
    textAlign: 'center', // text-center
    color: 'rgba(255, 255, 255, 0.8)', // text-white/80
    maxWidth: '32rem', // max-w-2xl
}