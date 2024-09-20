import { Calendar, Users, CheckSquare, Zap } from 'lucide-react'

export default function AboutSection() {
    return (
        <section className="my-container mt-20 mb-20">
            <div className="text-center mb-8">
                <h2 className="title-1 mb-1">
                    Why Choose Us
                </h2>
                <p className="text-foreground/90 text-xl">
                    Simplify your event planning process with our powerful and intuitive platform.
                </p>
            </div>
            <div className="">
                <div className="grid grid-cols-1 gap-8 sm:gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                        icon={<Calendar className="h-8 w-8 text-indigo-600" />}
                        title="Effortless Scheduling"
                        description="Create and manage events with our user-friendly calendar interface. Set dates, times, and recurring events with ease."
                    />
                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-indigo-600" />}
                        title="Attendee Management"
                        description="Keep track of your guest list, send invitations, and manage RSVPs all in one place. Communicate with attendees effortlessly."
                    />
                    <FeatureCard
                        icon={<CheckSquare className="h-8 w-8 text-indigo-600" />}
                        title="Task Organization"
                        description="Break down your event planning into manageable tasks. Assign responsibilities, set deadlines, and track progress."
                    />
                    <FeatureCard
                        icon={<Zap className="h-8 w-8 text-indigo-600" />}
                        title="Real-time Collaboration"
                        description="Work together with your team in real-time. Share updates, files, and comments to ensure everyone stays on the same page."
                    />
                </div>
            </div>
        </section>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="rounded-lg drop-shadow p-6 transition-shadow duration-300 bg-background cursor-default border">
            <div className="flex items-center justify-center w-12 h-12 rounded-md mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-2 text-base text-foreground/90">{description}</p>
        </div>
    )
}