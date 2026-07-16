---
title: "React-Native vs Native Mobile Development"
date: "2026-07-15"
summary: "React Native versus native isn't a contest — the two are layers of the same stack, and almost every app uses some of each. The useful question is how much of each a given project actually needs."
draft: false
---

When I first started looking seriously at mobile development, I assumed the job meant maintaining two separate codebases: one for iOS, one for Android.
Learning both platforms genuinely interested me, but the prospect of building and supporting the same app twice, in two languages, did not. That's why React Native immediately appealed to me.

After working within mobile development for a few years, I've stopped thinking about this as a contest.
The way the choice usually gets framed is React Native *versus* native; however, the two are not rivals competing for the same job.
They're layers of the same stack, and almost every app uses some of each.
The useful question isn't which one wins.
It's how much of each a given project actually needs, and that answer comes from the use case and what best serves the people using the app.

## The case for one codebase

One of the best parts of React Native is only having one codebase. This is great for fixing bugs (most of the time) as you don't have to fix the same problem twice.

That sounds like a convenience, but at team scale it's structural.
After five years of building their mobile apps on React Native, [Shopify's engineering team reported](https://shopify.engineering/five-years-of-react-native-at-shopify) that not building every feature twice let them "do more with the same number of people," and that keeping iOS and Android at feature parity went from a constant tax to, in their words, a non-issue.
If you've worked on a team where the Android build is perpetually a sprint behind the iOS one, you know that parity problem is an entire category of work that simply stops existing.

There's a second effect that matters even more for small teams, which is the number of people who can work on the app.
JavaScript remains the most widely used language among developers — [66% of respondents in Stack Overflow's 2025 survey](https://survey.stackoverflow.co/2025/technology), with 43.5% using React. Because of this, Shopify found that engineers moved between React and React Native far more easily than through native iOS and Android.
When your whole team is small or even just yourself, having that portability is the difference between shipping products and struggling to launch.

This is why React Native is such a natural fit for simple projects, small teams, and bootstrapped founders.
The tooling has developed around this use case. Specifically, [Expo](https://expo.dev/) has effectively become the default way to start a React Native app, letting a solo developer get to a polished, store-ready build without wiring up native toolchains by hand.
If your app is mostly screens, forms, data, and notifications, which describes a large share of apps, the one-codebase model is most likely the most efficient path to take.

## Where native still wins

Although React Native is becoming the default for building mobile apps, it doesn't mean that it should be the choice every time, especially when performance is the top priority.

First, it's worth pointing out how much React Native has improved on performance.
The old "React Native is slow" reputation came mostly from the bridge, which is the asynchronous layer that serialized everything crossing between JavaScript and native code.
[React Native 0.76 made the New Architecture the default](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture), which replaces that bridge with direct, synchronous calls (JSI), a new renderer (Fabric), and lazily loaded native modules (TurboModules).
Meta's [published benchmarks](https://github.com/reactwg/react-native-new-architecture/discussions/123) show substantial gains, faster startup on lower-end devices, 20–30% smaller initial memory footprint, and up to 50% faster native module calls. However, they're upfront that these are synthetic numbers and won't automatically translate to every app.
In production, Shopify reports sub-500ms P75 screen loads and over 99.9% crash-free sessions.
Their own summary is the fairest one I've seen: "native doesn't automatically mean fast, and React Native doesn't automatically mean slow."

But "fast enough for most apps" is not the same as "the best available."
When you're pushing the hardware to the limits with sustained 60fps custom animations, real-time camera or AR pipelines, on-device audio processing, heavy 3D or on-device ML, native gives you direct access to the Android or iOS platform without a JavaScript layer in the path.
Shopify is explicit that hitting their performance numbers still required native expertise to profile and clear bottlenecks, and they list the areas where they still reach for native outright such as device hardware features like scanning, memory-constrained surfaces like widgets and the Apple Watch, and long-running background work.

## Matching the tool to the app

So the decision isn't ideological. It's about where a specific app sits.

React Native is the right call when the app's value is in its features rather than its frame rate.
A scheduling app with offline data, push notifications, forms, and a calendar has essentially no platform-specific surface as one person can build and ship it to both stores in evenings. Going native here would double the work for no user-visible gain.
An internal tool built by a team who already know JavaScript and React is the same story from the other direction as teaching that team Swift and Kotlin would not be an efficient path.
A mobile companion to a web product generally will fall in the same category.

Now let's look at this from the other side.
Suppose someone described a fitness app whose entire pitch was continuous background sensor tracking like heart rate, motion, GPS, running for hours while paired with a first-class Apple Watch app and Live Activities on the lock screen.
React Native is probably not the best choice in this situation.
Almost every critical part of that product lands exactly where Shopify says native still wins, which is long-running background jobs, memory-constrained watch surfaces, and tight hardware access.
Wrapping that in React Native would mean fighting the framework for the 80% of the app that *is* the product.

Airbnb is the well-known cautionary tale here.
In 2018 they [sunset React Native](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a) and moved back to native, after 220 screens and roughly 120,000 lines of JavaScript.
Their core complaint was that maintaining a large mixed codebase meant "supporting code on three platforms instead of two" (iOS and Android).
Two points to keep in mind with this story.
First, it predates the New Architecture entirely, so the specific bridge problems they hit are the ones that have since been rebuilt.
Second, Airbnb themselves were careful to say their reasons "may not apply to your team," and pointed out that companies like Pinterest and Instagram kept using React Native successfully.

## The real question

In conclusion, the two most-cited data points in this whole debate, Shopify staying and Airbnb leaving, don't contradict each other.
Rather, they're the same principle producing different answers because the inputs were different.
That's why "React Native vs. native" shouldn't be the question that we are asking.

Instead, the question is how much React Native or native programming you should use.
Default to React Native for the shared, feature-driven bulk of the app, because for small teams and simple products the one-codebase advantage is crucial.
Reach for native where performance, hardware, or platform surfaces are the product rather than a detail.
For most apps, the right answer will most likely be React Native; for a few it sits more towards native. Most likely, though, the answer lies somewhere in between.
