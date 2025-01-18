# Reglas generales de React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.swmansion.reanimated.** { *; }

# Reglas para navegación
-keep class com.facebook.react.turbomodule.** { *; }

# Mantener constructores de JSC
-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }

# Hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Para librerías nativas
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# Reglas para Google Error Prone
-dontwarn com.google.errorprone.annotations.**
-keep class com.google.errorprone.annotations.** { *; }

# Reglas para Google Tink
-keep class com.google.crypto.tink.** { *; }
-keepclassmembers class * {
    @com.google.crypto.tink.annotations.** *;
}